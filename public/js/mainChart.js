
const chart = document.querySelector("#lineGraph");
var lineGraph = new Chart(chart, {
	type: 'bar',
	data: {
		labels:["M", "T", "W", "Th", "F", "Sa", "S"],
		datasets: [
			{label: "Flexing distance",
			data: [20, 12, 17, 19, 20, 18.5, 20],
			backgroundColor: "rgba(41, 206, 26, 0.5)",
			},
			]
		},
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }		
})


window.onload = function() {
    var ctx = document.querySelector("#realTime").getContext("2d");

    var data = {
        labels: ["00:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00	"],
        datasets: [{
            label: "Current",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)s",
            backgroundColor: "rgba(41, 206, 26, 0.5)",
            data: streamingData
        }, {
            label: "Prior Week",
            fillColor: "rgba(151,187,205,1)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            data: [28, 48, 67, 70, 44, 27, 30]
        }]
    };
    var options = {
        animation: false,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride: true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps: 10,
        //Number - The value jump in the hard coded scale
        scaleStepWidth: 10,
        //Number - The scale starting value
        scaleStartValue: 0
    };

    var myLineChart = new Chart(ctx, {
    	type:'line',
    	data: data,
    	options: options
    });

    setInterval(function() {
        setData(data.datasets[0].data);
        setData(data.datasets[1].data);
        setLabels(data.labels);

         var myLineChart = new Chart(ctx, {
    	type:'line',
    	data: data,
    	options: options
    });

    }, 2000);

    function setLabels(labels) {
        var nextMonthIndex = months.indexOf(labels[labels.length - 1]) + 1;
        var nextMonthName = months[nextMonthIndex] != undefined ? months[nextMonthIndex] : "January";
        labels.push(nextMonthName);
        labels.shift();
    }

    function setData(data) {
        data.push(getRandomInt(50, 75));
        data.shift();
    }

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

    function convertMonthNameToNumber(monthName) {
        var myDate = new Date(monthName + " 1, 2016");
        var monthDigit = myDate.getMonth();
        return isNaN(monthDigit) ? 0 : (monthDigit + 1);
    }

    var months = ["13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00"
   	];

};