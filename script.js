document.addEventListener("DOMContentLoaded", function() {

    var generated_number = [];
    var chart; 
    var themeFlag = false;

    function toggledarkmode() {
        var element = document.body;
        element.classList.toggle("dark-mode");

        themeFlag = !themeFlag;

        var theme_button = document.getElementById("theme_change");
        theme_button.textContent = themeFlag ? "Light" : "Dark";
    }
    toggledarkmode();

    function average(numbers){
        var sum = numbers.reduce((acc, curr) => acc + curr, 0);
        return sum / numbers.length;
    }

    function median(numbers){
        var sorted = numbers.slice().sort((a,b) => a - b);
        var mid_ind = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0){
            return (sorted[mid_ind - 1] + sorted[mid_ind]) / 2;
        }
        else{
            return sorted[mid_ind];
        }
    }

    function mode(numbers){
        var freq_map = {};
        numbers.forEach(function(number){
            freq_map[number] = (freq_map[number] || 0) + 1;
        });

        var max_freq = Math.max(...Object.values(freq_map));
        return Object.keys(freq_map).filter(key => freq_map[key] === max_freq);
    }

    document.getElementById("generateBtn").addEventListener("click", function(){
        var d = new Date();
        var t = d.getMilliseconds();
        var randomNumber = t % 10;
        document.getElementById("randomNumber").textContent = randomNumber;
        generated_number.push(randomNumber);
        updateStatistics();
        updateHistogramChart(); 
        // fetchFact(7);
    });

    // function fetchFact() {
    //     //var randomNumberValue = parseInt(document.getElementById("randomNumber").textContent);
      
    //     fetch(`http://numbersapi.com/${7}/{trivia}`)
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error('Try Again');
    //         }
    //         return response.text();
    //       })
    //       .then(data => {
    //         alert('Fact : ' + data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching fact:', error);
    //       });
    //   }
      

    document.getElementById("generateBtn2").addEventListener("click", function(){
        var d2 = new Date();
        var t2 = d2.getMilliseconds();
        var randomNumber10to100 = ((t2 % 90) + 10); 
        document.getElementById("randomNumber2").textContent = randomNumber10to100;
    });

    document.getElementById("theme_change").addEventListener("click", function(){
        toggledarkmode();
    });

    function updateStatistics(){
        if (generated_number.length > 0){
            var avg = average(generated_number).toFixed(2);
            var med = median(generated_number);
            var mod = mode(generated_number).join(', ');

            document.getElementById("average").textContent = avg;
            document.getElementById("median").textContent = med;
            document.getElementById("mode").textContent = mod;
        }
    }

    function updateHistogramChart() {
        var avg = average(generated_number).toFixed(2);
        var med = median(generated_number);
        var mod = mode(generated_number).join(', ');

        if (!chart) { 
            var ctx = document.getElementById('histogramChart').getContext('2d');
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mean', 'Median', 'Mode'],
                    datasets: [{
                        label: 'Statistics',
                        data: [avg, med, mod],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else { 
            chart.data.datasets[0].data = [avg, med, mod];
            chart.update(); 
        }
    }
});
