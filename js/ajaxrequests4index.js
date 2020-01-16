sadEmoji=document.createElement('p');
sadEmoji.innerHTML = "&#128542;";
valSadEmoji = sadEmoji.innerHTML;
strUnavailable = "Donnée inaccessible ";
strUnavailable = strUnavailable.concat(valSadEmoji);

angryEmoji=document.createElement('p');
angryEmoji.innerHTML = "&#128545;";
valAngryEmoji = angryEmoji.innerHTML;
strIncorrect = "Donnée incorrecte ";
strIncorrect = strIncorrect.concat(valAngryEmoji);


function refresh() {
    setDewDrop1();
    setTimeout(refresh,10000);
}

$(document).ready(function() {
  
    // Feeds it a configuration object, a bunch of raw data (JSON)
    // Can also get chrome plug that makes JSON look pretty
    // Once the GET is a success, run this. This is Asynchronous programming. We don't want the user to have to wait while this data is loading.
    refresh();
    
    
  });



function setDewDrop1(){
    $.ajax({ 
        type:"GET", // GET = requesting data
        url:"https://floriaaan.alwaysdata.net/atmos/measure/last/1",
        headers: {"Access-Control-Allow-Headers": "*"},
        success: function(data) {
            if(document.getElementById("tempCardDew1").classList.contains("border-left-danger")) {
                document.getElementById("tempCardDew1").classList.remove("border-left-danger");
            }

            if(document.getElementById("tempTitleDew1").classList.contains("text-danger")) {
                document.getElementById("tempTitleDew1").classList.remove("text-danger");
            }
            document.getElementById("tempCardDew1").classList.add("border-left-success");
            document.getElementById("tempTitleDew1").classList.add("text-success");
            
            

            $('#tempDew1').text(data.temp + "°C"); // Set data that comes back from the server to 'tempDew1'
            if(data.humidite >= 0 && data.humidite <= 100) {
                $('#humidDew1').text(data.humidite + "%");
                if(document.getElementById("humidCardDew1").classList.contains("border-left-danger")) {
                    document.getElementById("humidCardDew1").classList.remove("border-left-danger");
                }

                if(document.getElementById("humidTitleDew1").classList.contains("text-danger")) {
                    document.getElementById("humidTitleDew1").classList.remove("text-danger");
                }


                document.getElementById("humidCardDew1").classList.add("border-left-success");
                document.getElementById("humidTitleDew1").classList.add("text-success");
                document.getElementById("humidBarDew1").style.width = data.humidite + "%";
            } else {
                document.getElementById("humidCardDew1").classList.add("border-left-danger");
                document.getElementById("humidTitleDew1").classList.add("text-danger");
                $('#humidDew1').text(strIncorrect);
            }
             // Set data that comes back from the server to 'tempDew1'
        },
        error: function(data) {

            document.getElementById("tempCardDew1").classList.add("border-left-danger");
            document.getElementById("tempTitleDew1").classList.add("text-danger");
            $('#tempDew1').text(strUnavailable);
            

            document.getElementById("humidCardDew1").classList.add("border-left-danger");
            document.getElementById("humidTitleDew1").classList.add("text-danger");
            document.getElementById("humidBarDew1").style.width = "0px";
            $('#humidDew1').text(strUnavailable);
        },
        dataType: 'json',
    });
};