var activities = ["식사 중","컴퓨터 사용 중","핸드폰 사용 중","필기 중","걷는 중","엎드려 자는 중","직접입력"];
var num_activities = activities.length;
var curr_activity = -1;
actElem = document.getElementById("activity");

function check_act(){
	if (curr_activity==num_activities-1)
		actElem.disabled = false;
	else
		actElem.disabled = true;
}

function companion_plus()
{
	var num_people = Number(document.getElementById("companions").value);
	
	if (num_people >= 10)
		{
			num_people = 10;
		}
	else{
		num_people = num_people + 1;
	}
	
	document.getElementById("companions").value = String(num_people);
	
	buttonFeedback();
	
}
function companion_minus()
{
	var num_people = Number(document.getElementById("companions").value);
	
	if (num_people <= 0)
		{
			num_people = 0;
		}
	else{
		num_people = num_people - 1;
	}
	
	document.getElementById("companions").value = String(num_people);	
	
	buttonFeedback();
}
function people_plus()
{
	var num_people = Number(document.getElementById("peoples").value);
	
	if (num_people >= 10)
		{
			num_people = 10;
		}
	else{
		num_people = num_people + 1;
	}
	
	document.getElementById("peoples").value = String(num_people);
	
	buttonFeedback();
	
}
function people_minus()
{
	var num_people = Number(document.getElementById("peoples").value);
	
	if (num_people <= 0)
		{
			num_people = 0;
		}
	else{
		num_people = num_people - 1;
	}
	
	document.getElementById("peoples").value =  String(num_people);	
	
	buttonFeedback();
}

function left(){
	if (curr_activity === -1 || curr_activity === 0  ) {
		curr_activity = num_activities - 1;
	} else {
		curr_activity = curr_activity -1;
	}
	
	check_act();
		
	document.getElementById("activity").value = activities[curr_activity];
	
	buttonFeedback();
} 

function right(){
	if (curr_activity === -1 || curr_activity === num_activities - 1 ) {
		curr_activity = 0;
	
	} else {
		curr_activity = curr_activity + 1;
	}
	check_act();
	
	document.getElementById("activity").value = activities[curr_activity];
	
	buttonFeedback();
}

///////////////////////////////////////////////////////////////////////////////////////



var companion_plus_btn = document.getElementById("companion_plus_btn");
if (companion_plus_btn !== null){
	companion_plus_btn.addEventListener("click", companion_plus, false);
}
var companion_minus_btn = document.getElementById("companion_minus_btn");
if (companion_minus_btn !== null){
	companion_minus_btn.addEventListener("click", companion_minus, false);
}
var people_plus_btn = document.getElementById("people_plus_btn");
if (people_plus_btn !== null){
	people_plus_btn.addEventListener("click", people_plus, false);
}
var people_minus_btn = document.getElementById("people_minus_btn");
if (people_minus_btn !== null){
	people_minus_btn.addEventListener("click", people_minus, false);
}
var left_btn = document.getElementById("left_btn_act");
if (left_btn !== null){
	left_btn.addEventListener("click", left, false);
}
var right_btn = document.getElementById("right_btn_act");
if (right_btn !== null){
	right_btn.addEventListener("click", right, false);
}

document.getElementById("savePAct").addEventListener("click",function(){
	var people = document.getElementById("peoples").value;
	var companion = document.getElementById("companions").value;
	activity = document.getElementById("activity").value;
	saveData("people",people);
	saveData("companion",companion);
	saveData("activity",activity);
	logging("People and Act Saved : people (" + people + ", " + companion + "), activity (" + activity + ")");
	
	buttonFeedback();
});
