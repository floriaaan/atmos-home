var mymap = L.map('mapid').setView([49.42266, 1.066265], 11);

function DispMap(){
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
            maxZoom: 18,
            attribution: 'Map data &2opy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        })
        .addTo(mymap);
}

//Fonction qui affiche la position des sondes sur la carte

$(document).ready(function() {
    refresh();
    DispMap();
});

function GetProbe_pos()
{
    $.ajax({
        type:"GET",
        url:"http://localhost:5000/atmos/probe/",
        headers:{"Access-Control-Allow-Header": "*"},
        success: function(data){
            let probes_info = [];
            for(i=0;i<data.length;i++)
            {
                DispProbe_pos(data[i]['id'],data[i]['user'],data[i]['name'],data[i]['pos_x'],data[i]['pos_y'],data[i]['active'],data[i]['error'])
                probes_info.push({'id':data[i]['id'],'probename':data[i]['name'],'pos_x':data[i]['pos_x'],'pos_y':data[i]['pos_y']})
            }
            GetProbe_measures(probes_info)
        },
        error: function(){
            GetFictiveProbe_pos();
        },
        dataType:'json',
    });

}
function GetFictiveProbe_pos()
{
    data=new Array;
    data=[
        {'id':0,'user':1,'pos_x':49.033326,'pos_y':0.1256,'name':"sonde_1",'active':1,'error':0}
        ,{'id':1,'user':1,'pos_x':45.226555,'pos_y':1.3333,'name':"sonde_2_unactive",'active':0,'error':0}
        ,{'id':2,'user':1,'pos_x':44.5,'pos_y':3.3333,'name':"sonde_3_error",'active':1,'error':1}
        ,{'id':3,'user':2,'pos_x':48.6555,'pos_y':2.16333,'name':"sonde_4_diffuser",'active':1,'error':0}
    ]
    probes_info=new Array;
    for(i=0;i<data.length;i++)
    {
        DispProbe_pos(data[i]['id'],data[i]['user'],data[i]['name'],data[i]['pos_x'],data[i]['pos_y'],data[i]['active'],data[i]['error'])
        probes_info.push({'id':data[i]['id'],'probename':data[i]['name'],'pos_x':data[i]['pos_x'],'pos_y':data[i]['pos_y']})
    }
    Fictive_Measures(probes_info)
}


function GetProbe_measures(probes_info)
{
    $.ajax({
        type:"GET",
        url:"http://10.176.129.94:5000/atmos/measure/last/all",
        headers:{"Access-Control-Allow-Header": "*"},
        success: function(data_measures){
            data_full=new Array;
            for(j=0;j<data_measures.length;j++)
            {
                if(data_measures[j]['error']['flag']==true){
                    data_full.push({'id':probes_info[j]['id'],'probename':probes_info[j]['probename'],'pos_x':probes_info[j]['pos_x'],'pos_y':probes_info[j]['pos_y'],'temp':"N/A",'humi':"N/A",'date':"N/A"})
                    DispProbe_measure(data_measures.length,data_full[j]['id'],data_full[j]['probename'],data_full[j]['pos_x'],data_full[j]['pos_y'],data_full[j]['temp'],data_full[j]['humi'],data_full[j]['date'])
                }
                else{
                    data_full.push({'id':data_measures[j]['probe_id'],'probename':probes_info[data_measures[j]['probe_id']]['probename'],'pos_x':probes_info[data_measures[j]['probe_id']]['pos_x'],'pos_y':probes_info[data_measures[j]['probe_id']]['pos_y'],'temp':data_measures[j]['temp'],'humi':data_measures[j]['humidite'],'date':data_measures[j]['date']})
                    DispProbe_measure(data_measures.length,data_full[j]['id'],data_full[j]['probename'],data_full[j]['pos_x'],data_full[j]['pos_y'],data_full[j]['temp'],data_full[j]['humi'],data_full[j]['date'])
                }
            }
        },
        error: function(){
            data_full=new Array;
            for(j=0;j<probes_info.length;j++)
            {
                data_full.push({'id':probes_info[j]['id'],'probename':probes_info[j]['probename'],'pos_x':probes_info[j]['pos_x'],'pos_y':probes_info[j]['pos_y'],'temp':"N/A",'humi':"N/A",'date':"N/A"})
                DispProbe_measure(probes_info.length,data_full[j]['id'],data_full[j]['probename'],data_full[j]['pos_x'],data_full[j]['pos_y'],data_full[j]['temp'],data_full[j]['humi'],data_full[j]['date'])
            }
        },
        dataType:'json',
    });

}

function Fictive_Measures(probes_info)
{
    data_measures=new Array;
    data_measures=[
        {'id':0,'temp':27.2,'humi':37.5,'date':"2020-01-01 17:08:55"}
        ,{'id':1,'temp':29.4,'humi':36.2,'date':"2020-01-04 17:07:46"}
        ,{'id':3,'temp':28.0,'humi':30.0,'date':"2020-01-03 12:05:39"}
    ]
    data_full=new Array;
    for(j=0;j<data_measures.length;j++)
    {
        data_full.push({'id':data_measures[j]['id'],'probename':probes_info[data_measures[j]['id']]['probename'],'pos_x':probes_info[data_measures[j]['id']]['pos_x'],'pos_y':probes_info[data_measures[j]['id']]['pos_y'],'temp':data_measures[j]['temp'],'humi':data_measures[j]['humi'],'date':data_measures[j]['date']})
        DispProbe_measure(data_measures.length,data_full[j]['id'],data_full[j]['probename'],data_full[j]['pos_x'],data_full[j]['pos_y'],data_full[j]['temp'],data_full[j]['humi'],data_full[j]['date'])
    }
}

function DispProbe_pos(id_probe,user,name,pos_x,pos_y,isactive,error)
{
    var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    if(isactive==1)
    {
        L.marker([pos_x, pos_y],{icon: greenIcon})
            .bindPopup('<b>' +"Nom de la sonde : "+name+" (id : "+id_probe+")"+'</b>')
            .addTo(mymap);
    }
    else
    {
        L.marker([pos_x, pos_y],{icon: redIcon})
            .bindPopup('<b>' +"Nom de la sonde : "+name+" (id : "+id_probe+")"+'</b>')
            .addTo(mymap);
    }

}

function DispProbe_measure(nbmeasure,id,probename,pos_x,pos_y,temp,humi,date)
{

    L.circle([pos_x,pos_y],{})
        .setRadius(500)
        .bindPopup('<b>'+"Température : "+temp+'°C<br/>'+"Humidité : "+humi+"%"+'<br/>'+"Date : "+date+'<br/>'+"Nom de la sonde : "+probename+'</b>')
        .addTo(mymap);
}

function refresh(isfictive)
{
    mymap.eachLayer(function(layer){
        if((layer._url)!=("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw")){
            mymap.removeLayer(layer);
        }
    })

    GetProbe_pos();
    setTimeout(refresh,20000);
}