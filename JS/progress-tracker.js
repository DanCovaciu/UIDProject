var click_number = 0;
const max_percent = 100;

$(document).ready(function (){
	console.log("checkpoint 1 here");
	
	var list = document.getElementById("myul").getElementsByTagName("li");
	var listLength = list.length;
	
	var element = document.querySelector('.chart');
	var chart = new EasyPieChart(element, {
	  lineWidth: '10',
	  barColor: '#F4BA01',
	  trackColor: 'rgba(255, 255, 255, 0.5)',
	  scaleColor: true,
	  onStep: function(from, to, currentValue) {
		this.el.querySelector('.percent').innerText = `${Math.round(currentValue)}%`;
	  },
	});
	
	$("li").click(function (e) {
		console.log("checkpoint 2 here");
        var cb = $(this).find(":checkbox")[0];
        if (e.target != cb) 
			cb.checked = !cb.checked;
		
		update_chart(chart, cb, listLength);
        $(this).toggleClass("selected", cb.checked);
    });
}); 

function update_chart(chart, cb, listLength) {
    if (!cb.checked) {
			click_number = click_number - 1;
			console.log(click_number);
			chart.update(click_number*(100/listLength));
		}
		else {
			click_number = click_number + 1;
			chart.update(click_number*(100/listLength));
		}
}
