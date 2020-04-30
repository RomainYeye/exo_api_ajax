$("#ville").keyup(function(e) {
    var listeVilles = [];
    var ville = $(this).val();
    $.ajax({
        url: "https://geo.api.gouv.fr/communes?nom=%27" + ville + "+%27&fields=departement&boost=population&limit=5",
        type: "GET",
        success: function(response) {
            $(response).each(function(index, element) {
                listeVilles.push(element.nom);
            })
            $("#ville").autocomplete({source:listeVilles});
        },
        error: function(xhr, message, status) {
            console.log(message);
        }
    })
})

$("#valider").click(function(e) {
    $("#affichage").remove();
    var ville = $("#ville").val();
    url = "http://api.openweathermap.org/data/2.5/weather?q=" + ville + ",fr&APPID=ce4c4e1989d1b0af02b9953d2bba300f";
    $.ajax({
        url: url,
        type: "GET",
        success: function(resultat) {
            console.log(resultat.weather[0].main);
            var weather = resultat.weather[0].main;
            switch(weather) {
                case "Rain":
                    var iClass = "fas fa-cloud-showers-heavy fa-2x";
                    break;
                case "Clear":
                    var iClass = "far fa-sunn fa-2x";
                    break;
                case "Clouds":
                    var iClass = "fas fa-cloud fa-2x";
                    break;
            }
            if(iClass) {
                var li = $('<i class="' + iClass +'"></i>');
                li.show();
            }
            var div = $("<row>").attr({"id": "affichage"});
            div.html(resultat.weather[0].main + " ");
            div.append(li);
            $("#col").append(div);
        },
        error: function(xhr, message, status) {
            console.log(message);
        }
    })
})
