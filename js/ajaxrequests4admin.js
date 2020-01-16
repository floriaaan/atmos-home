function addProbe(name, x, y){

    let datas = JSON.stringify({
        'probe_name' : name,
        'latitude' : parseFloat(x),
        'longitude' : parseFloat(y)


    });

    console.log("data", datas);

    $.ajax({
        type:"POST",
        url:"http://localhost:5000/atmos/probe/add/",
        data: datas,
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
            "charset": "utf-8"},
        success: function() {
            
            console.log("Votre sonde a bien été ajouté au système.");
            
             // Set data that comes back from the server to 'tempDew1'
        },
        error: function() {

            console.log("Une erreur s'est produite.");
        },
        dataType: 'json',
    });
    $('#AddProbe').modal('hide');
}

function delProbe(id){
    $.ajax({ 
        type:"PUT", // UPDATE
        url:"http://localhost:5000/atmos/probe/state/change/" + id,
        headers: {"Access-Control-Allow-Headers": "*"},
        success: function() {

            getStateProbe(function(rGetState){



                if (rGetState === 1) {
                    console.log("active");
                    if(document.getElementById("probeActive").classList.contains("btn-danger")) {
                        document.getElementById("probeActive").classList.remove("btn-danger");
                    }
                    if(document.getElementById("DelProbeBtnDisplay").classList.contains("btn-success")) {
                        document.getElementById("DelProbeBtnDisplay").classList.remove("btn-success");
                    }
                    if(document.getElementById("probeActive").classList.contains("btn-warning")) {
                        document.getElementById("probeActive").classList.remove("btn-warning");
                    }
                    document.getElementById("probeActive").classList.add("btn-success");
                    document.getElementById("DelProbeBtnDisplay").classList.add("btn-danger");
                    $('#probeActive').text("Sonde activée");
                    $('#DelProbeBtnText').text("Désactiver la sonde");

                    $('#DelProbeLabel').text("Désactivation");
                    $('#DelProbeText').text("Voulez-vous désactiver DewDrop du Garage ?");
                    $('#DelProbeBtn').text("Désactiver");

                    if(document.getElementById("borderModal").classList.contains("border-bottom-success")) {
                        document.getElementById("borderModal").classList.remove("border-bottom-success");
                    }
                    document.getElementById("borderModal").classList.add("border-bottom-danger");
                    if(document.getElementById("DelProbeBtn").classList.contains("btn-success")) {
                        document.getElementById("DelProbeBtn").classList.remove("btn-success");
                    }
                    document.getElementById("DelProbeBtn").classList.add("btn-danger");

                } else {
                    if(rGetState === 0){
                        console.log("not active");
                        if(document.getElementById("probeActive").classList.contains("btn-success")) {
                            document.getElementById("probeActive").classList.remove("btn-success");
                        }
                        if(document.getElementById("DelProbeBtnDisplay").classList.contains("btn-danger")) {
                            document.getElementById("DelProbeBtnDisplay").classList.remove("btn-danger");
                        }
                        if(document.getElementById("probeActive").classList.contains("btn-warning")) {
                            document.getElementById("probeActive").classList.remove("btn-warning");
                        }
                        document.getElementById("probeActive").classList.add("btn-danger");
                        document.getElementById("DelProbeBtnDisplay").classList.add("btn-success");
                        $('#probeActive').text("Sonde désactivée");
                        $('#DelProbeBtnText').text("Activer la sonde");


                        $('#DelProbeLabel').text("Activation");
                        $('#DelProbeText').text("Voulez-vous réactiver DewDrop du Garage ?");
                        $('#DelProbeBtn').text("Activer");

                        if(document.getElementById("borderModal").classList.contains("border-bottom-danger")) {
                            document.getElementById("borderModal").classList.remove("border-bottom-danger");
                        }
                        document.getElementById("borderModal").classList.add("border-bottom-success");
                        if(document.getElementById("DelProbeBtn").classList.contains("btn-danger")) {
                            document.getElementById("DelProbeBtn").classList.remove("btn-danger");
                        }
                        document.getElementById("DelProbeBtn").classList.add("btn-success");



                        
                    } else {
                        console.log("other");
                        if(document.getElementById("probeActive").classList.contains("btn-success")) {
                            document.getElementById("probeActive").classList.remove("btn-success");
                        }
                        if(document.getElementById("probeActive").classList.contains("btn-danger")) {
                            document.getElementById("probeActive").classList.remove("btn-danger");
                        }
                        document.getElementById("probeActive").classList.add("btn-warning");
                        $('#probeActive').text("Etat de la sonde inconnu");
                    }
                    
                }
            });

        },
        error: function() {
            alert("Une erreur s'est produite.");
        },
        dataType: 'json',
    });
    $('#DelProbe').modal('hide');
}

function getStateProbe(callback){
    $.ajax({ 
        type:"GET", // UPDATE
        url:"http://localhost:5000/atmos/probe/",
        headers: {"Access-Control-Allow-Headers": "*"},
        success: function(data) {
            if(data[1].active === "1") {
                callback(1);
            } else {
                callback(0);
            }
        },
        error: function() {
            callback(-1);

        },
        dataType: 'json',
    });
}

$(document).ready(function() {
    $("#btnAddProbe").attr("disabled", true);
    $('#locationAutoBtn').click(function () {
        navigator.geolocation.getCurrentPosition(function(pos)
        {
            let crd = pos.coords;
            /*console.log('Votre position actuelle est :');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude : ${crd.longitude}`);
            console.log(`La précision est de ${crd.accuracy} mètres.`);*/
            /*$('#locationAutoText').text(`${crd.latitude} + ${crd.longitude} avec une précision de ${crd.accuracy}`);

            $('#locationPos').text(`${crd.latitude} + ${crd.longitude} avec une précision de ${crd.accuracy}`);*/
            $('#positionX').val(`${crd.latitude}`);
            $('#positionY').val(`${crd.longitude}`);

            $('#locationTicked').html('<i class="fas fa-check-circle"></i>');
            $('#locationAutoTicked').html('<i class="fas fa-check-circle"></i>');

        },function(err) {
                console.warn(`ERREUR (${err.code}): ${err.message}`);
                $('#locationTicked').html('<i class="fas fa-exclamation-circle"></i>');
                $('#locationAutoTicked').html('<i class="fas fa-exclamation-circle"></i>');

            }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });

    });

    $('#locationManualBtn').click(function () {
        if(!($('#inputAddress').val() === "" && $('#inputZip').val() === "" && $('#inputCity').val() === "")) {
            $.ajax({
                type: "GET",
                url: "https://api-adresse.data.gouv.fr/search/?q=" + $('#inputAddress').val() + "+" + $('#inputCity').val() + "+" + $('#inputZip').val(),

                success: function(data) {
                    //$('#locationPos').text(`${data.features[0].geometry.coordinates[1]} + ${data.features[0].geometry.coordinates[0]}`);
                    $('#positionX').val(`${data.features[0].geometry.coordinates[1]}`);
                    $('#positionY').val(`${data.features[0].geometry.coordinates[0]}`);
                    $('#locationTicked').html('<i class="fas fa-check-circle"></i>');
                    $('#locationManualTicked').html('<i class="fas fa-check-circle"></i>');
                },
                error: function () {
                    $('#locationManualText').text("Erreur : connexion échouée!");
                    $('#locationTicked').html('<i class="fas fa-exclamation-circle"></i>');
                    $('#locationManualTicked').html('<i class="fas fa-exclamation-circle"></i>');
                }
            });
        } else {
            $('#locationManualText').text("Erreur : saisie incorrecte!");
            $('#locationTicked').html('<i class="fas fa-exclamation-circle"></i>');
            $('#locationManualTicked').html('<i class="fas fa-exclamation-circle"></i>');
        }

    });


    $('#LocationBtn').click(function() {
        $('#location').modal('hide');
        if ($('#positionX').val() === "" || $('#positionY').val() === ""){
            $('#locationTicked').html('<i class="fas fa-exclamation-circle"></i>');
            $('#locationPos').text("Vous n'avez pas renseigné votre localisation.");
            $("#btnAddProbe").attr("disabled", true);
        } else {
            $('#locationPos').text("");
            $("#btnAddProbe").attr("disabled", false);
        }

    });

    $('#btnAddProbe').click(function () {

        if ($('#positionX').val() === "" || $('#positionY').val() === "") {
            $("#btnAddProbe").attr("disabled", true);
        }

        let x = $("#positionX").val();
        let y = $("#positionY").val();
        let name = $("#ProbeName").val();

        addProbe(name, x, y);

        $("#ProbeName").val("");
        $("#positionX").val("");
        $("#positionY").val("");
        $('#locationAutoText').text("");

        $('#locationPos').text("");

        $('#locationTicked').html('');
        $('#locationAutoTicked').html('');
        $('#locationManualTicked').html('');

    });

    $('#DelProbeBtn').click(function () {
        delProbe(2);
    });


    
});

$(document).ready(function() {
    checkStateAndDisplay();
  refresh();
    
    
});

function checkStateAndDisplay(){
    getStateProbe(function(state){
        if (state === 1) {
            if(document.getElementById("DelProbeBtnDisplay").classList.contains("btn-warning")) {
                document.getElementById("DelProbeBtnDisplay").classList.remove("btn-warning");
            }

            if(document.getElementById("DelProbeBtnDisplay").classList.contains("disabled")) {
                document.getElementById("DelProbeBtnDisplay").classList.remove("disabled");
            }
            document.getElementById("probeActive").classList.add("btn-success");
            document.getElementById("borderModal").classList.add("border-bottom-danger");
            document.getElementById("DelProbeBtnDisplay").classList.add("btn-danger");
            $('#probeActive').text("Sonde activée");
            $('#DelProbeBtnText').text("Désactiver la sonde");

            $('#DelProbeLabel').text("Désactivation");
            $('#DelProbeText').text("Voulez-vous désactiver DewDrop du Garage ?");
            $('#DelProbeBtn').text("Désactiver");
        } else {
            if (state === 0) {
                if(document.getElementById("DelProbeBtnDisplay").classList.contains("btn-warning")) {
                    document.getElementById("DelProbeBtnDisplay").classList.remove("btn-warning");
                }

                if(document.getElementById("DelProbeBtnDisplay").classList.contains("disabled")) {
                    document.getElementById("DelProbeBtnDisplay").classList.remove("disabled");
                }

                document.getElementById("probeActive").classList.add("btn-danger");
                document.getElementById("borderModal").classList.add("border-bottom-danger");
                document.getElementById("DelProbeBtnDisplay").classList.add("btn-success");
                $('#probeActive').text("Sonde désactivée");
                $('#DelProbeBtnText').text("Activer la sonde");


                $('#DelProbeLabel').text("Activation");
                $('#DelProbeText').text("Voulez-vous réactiver DewDrop du Garage ?");
                $('#DelProbeBtn').text("Activer");
            } else {
                document.getElementById("probeActive").classList.add("btn-warning");
                $('#probeActive').text("Etat de la sonde inconnu");
                $('#DelProbeBtnText').text("Inconnu");
                document.getElementById("DelProbeBtnDisplay").classList.add("btn-warning");
                document.getElementById("DelProbeBtnDisplay").classList.add("disabled");
            }


        }
    });
}

function refresh() {
    checkStateAndDisplay();
    setTimeout(refresh, 30000);
}