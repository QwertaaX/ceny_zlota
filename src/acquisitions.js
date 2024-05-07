import Chart from 'chart.js/auto'

$.get("http://api.nbp.pl/api/cenyzlota/last/30/?format=json", "json")
    .done(function(data) {
        new Chart(
          document.getElementById('acquisitions'),
          {
            type: 'line',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        onClick: null,
                    },
                    title: {
                        display: true,
                        text: "Ostatnie 30 notowań cen złota*",
                        font: {
                            size: 32
                        }
                    },
                    subtitle: {
                        display: true,
                        text: "*Dane pobrane z NBP",
                        font: {
                            size: 15
                        }
                    }
                },
            },
            data: {
              labels: data.map(row => row.data),
              datasets: [
                {
                  label: 'Cena złota [zł]',
                  data: data.map(row => row.cena)
                }
              ]
            }
          }
        );
    });

// makes the chart not appear blurry when resized
$(window).on("afterprint", function() {
  for (let id in Chart.instances) {
    Chart.instances[id].resize();
  }
});