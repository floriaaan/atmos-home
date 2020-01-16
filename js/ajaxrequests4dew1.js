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
    update();
    setTimeout(refresh, 60000);
}

$(document).ready(function() {
  
    // Feeds it a configuration object, a bunch of raw data (JSON)
    // Can also get chrome plug that makes JSON look pretty
    // Once the GET is a success, run this. This is Asynchronous programming. We don't want the user to have to wait while this data is loading.
    refresh();
    
    
  });



function update(){
    $.ajax({ 
        type:"GET", // GET = requesting data
        url:"https://floriaaan.alwaysdata.net/atmos/measure/1",
        headers: {"Access-Control-Allow-Headers": "*"},
        success: function(data) {
            tableUpdate(data);
            chartUpdate(data);

            
             // Set data that comes back from the server to 'tempDew1'
        },
        error: function(data) {
            tableError();

        },
        dataType: 'json',
    });
};


function tableError() {
    $('#dateTable1').text(strUnavailable);
    $('#tempTable1').text(strUnavailable);
    $('#humidTable1').text(strUnavailable);

    $('#dateTable2').text(strUnavailable);
    $('#tempTable2').text(strUnavailable);
    $('#humidTable2').text(strUnavailable);

    $('#dateTable3').text(strUnavailable);
    $('#tempTable3').text(strUnavailable);
    $('#humidTable3').text(strUnavailable);

    $('#dateTable4').text(strUnavailable);
    $('#tempTable4').text(strUnavailable);
    $('#humidTable4').text(strUnavailable);

    $('#dateTable5').text(strUnavailable);
    $('#tempTable5').text(strUnavailable);
    $('#humidTable5').text(strUnavailable);
}

function tableUpdate(data) {
    var index = data.length;
    $('#dateTable1').text(data[index - 1].date);
    $('#tempTable1').text(data[index - 1].temp);
    $('#humidTable1').text(data[index - 1].humidite);

    $('#dateTable2').text(data[index - 2].date);
    $('#tempTable2').text(data[index - 2].temp);
    $('#humidTable2').text(data[index - 2].humidite);

    $('#dateTable3').text(data[index - 3].date);
    $('#tempTable3').text(data[index - 3].temp);
    $('#humidTable3').text(data[index - 3].humidite);

    $('#dateTable4').text(data[index - 4].date);
    $('#tempTable4').text(data[index - 4].temp);
    $('#humidTable4').text(data[index - 4].humidite);

    $('#dateTable5').text(data[index - 5].date);
    $('#tempTable5').text(data[index - 5].temp);
    $('#humidTable5').text(data[index - 5].humidite);
}

// // Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function chartUpdate(data) {
    var index = data.length - 1;

    var date = [];
    var temperature = [];
    var humidite = [];
   
    var printedValues = index - 300;

    if (printedValues < 0) {
        printedValues = 0;
    }


    var init = 0;
    for(var k = printedValues; k <= index; k++){
        date[init] = data[k].date;
        temperature[init] = data[k].temp;
        humidite[init] = data[k].humidite;
        init++;
    }

    var ctx = document.getElementById("ChartDew1");
    var DewChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [{
          label: "Température",
          lineTension: 0.3,
          backgroundColor: "rgba(53, 38, 82, 0.05)",
          borderColor: "rgba(53, 38, 82, 1)",
          pointRadius: 1,
          pointBackgroundColor: "rgba(53, 38, 82, 1)",
          pointBorderColor: "rgba(53, 38, 82, 1)",
          pointHoverRadius: 2,
          pointHoverBackgroundColor: "rgba(53, 38, 82, 1)",
          pointHoverBorderColor: "rgba(53, 38, 82, 1)",
          pointHitRadius: 5,
          pointBorderWidth: 1,
          data: temperature,
        },
        {
            label: "Humidité",
            lineTension: 0.3,
            backgroundColor: "rgba(86, 128, 233, 0.05)",
            borderColor: "rgba(86, 128, 233, 1)",
            pointRadius: 1,
            pointBackgroundColor: "rgba(86, 128, 233, 1)",
            pointBorderColor: "rgba(86, 128, 233, 1)",
            pointHoverRadius: 2,
            pointHoverBackgroundColor: "rgba(86, 128, 233, 1)",
            pointHoverBorderColor: "rgba(86, 128, 233, 1)",
            pointHitRadius: 5,
            pointBorderWidth: 1,
            data: humidite,
          }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
            xAxes: [{
                time: {
                  unit: 'date'
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                    min: 0,
                    maxTicksLimit: 5
                },
                display: false
              }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return number_format(value);
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: true
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': ' + tooltipItem.yLabel;
            }
          }
        }
      }
    });
}
// Area Chart Example

