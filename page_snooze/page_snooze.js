
function plusD()
{
	var delay_min = Number(document.getElementById("snooze_min").getAttribute("value"));
	
	console.log("pressed plusButton");
	
	if (delay_min >= 60)
		{
			delay_min = 60;
		}
	else{
		delay_min = delay_min + 5;
	}
	
	document.getElementById("snooze_min").setAttribute("value", String(delay_min));
	
	buttonFeedback();
	
	setDelay(delay_min);
}
function minusD()
{
	var delay_min = Number(document.getElementById("snooze_min").getAttribute("value"));
	
	if (delay_min <= 5)
		{
			delay_min = 5;
		}
	else{
		delay_min = delay_min - 5;
	}
	
	document.getElementById("snooze_min").setAttribute("value", String(delay_min));	
	
	buttonFeedback();
	
	setDelay(delay_min);
}


///////////////////////////////////////////////////////////////////////////////////////


var plus_btn = document.getElementById("plus_delay");
if (plus_btn !== null){
	plus_btn.addEventListener("click", plusD, false);
}
var minus_btn = document.getElementById("minus_delay");
if (minus_btn !== null){
	minus_btn.addEventListener("click", minusD, false);
}

