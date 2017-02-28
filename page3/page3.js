var activities = ["식사 중","컴퓨터 사용 중","핸드폰 사용 중","필기 중","걷는 중","엎드려 자는 중","직접입력"];
var num_activities = activities.length;
var curr_activity = -1;
var numPeople = 0, numCompanion = 0;
actElem = document.getElementById("activity");

var actStream;
var isLoadedAct = false;

var actList = [], callFlagAct;
//update activity list
function updateActList(list){
	for (i = 0 ; i < list.length; i++){
		console.log(list[i]);
		if (list[i].length != 0)
			activities.push(list[i]);
	}
	num_activities = activities.length;
	console.log(activities);
}
//get activity list from file
function getActivityList(){
	var list = [];
	isLoadedAct = true;
	tizen.filesystem.resolve("wgt-private", function(result){
		dir = result;
		try{
			actFile = dir.resolve("activity.txt");
		}
		catch(e){
			logging("error to resolve file : " + e.message);
			console.log("error to resolve file : " + e.message);
			actFile = dir.createFile("activity.txt");
		}
		actFile.openStream("rw",function(fs){
			actStream = fs;
			actFile.readAsText(function(str){
				actList = str.split(',');
				actSize = actList.length;
				console.log("Successfully import");
				updateActList(actList);
				return list;
			}, function(e){
				logging("error for reading : " + e.message);
				return list;
			})
		}, function(e){
			logging("error for opening : " + e.message);
			return list;
		});
		
	}, function(e){
		logging("error to resolve private folder : " + e.message);
		return list;
	}, "rw");
}
//In sometimes, getActivityList is not called, loadActivity function is called repeatedly until getActivityList is called
loadActivity = function (){
	console.log("call loadFunction");
	window.clearInterval(callFlag);
	if (!isLoadedAct){
		console.log("Not fully called");
		actList2 = getActivityList();
		callFlag = window.setInterval(loadActivity, 1000);
	}
	else{
		console.log("successfully loaded function for activity list");
	}
};

callFlag = window.setInterval(loadActivity, 1000);

function check_act(){
	if (curr_activity==6)
		actElem.disabled = false;
	else
		actElem.disabled = true;
}

function companion_plus()
{
//	var num_people = Number(document.getElementById("companions").value);
	var num_people = numCompanion;
	
	if (num_people >= 20)
		{
			num_people = 20;
			document.getElementById("companions").value = "+";
		}
	else{
		num_people = num_people + 1;
		document.getElementById("companions").value = String(num_people);
	}
	numCompanion = num_people;
	
	buttonFeedback();
	
}
function companion_minus()
{
//	var num_people = Number(document.getElementById("companions").value);
	var num_people = numCompanion;
	
	if (num_people <= 0)
		{
			num_people = 0;
		}
	else{
		num_people = num_people - 1;
	}
	
	document.getElementById("companions").value = String(num_people);	
	numCompanion = num_people;
	
	buttonFeedback();
}
function people_plus()
{
//	var num_people = Number(document.getElementById("peoples").value);
	var num_people = numPeople;
	
	if (num_people >= 20)
		{
			num_people = 20;
			console.log(String(num_people) + "+");
			document.getElementById("peoples").value = "+";
		}
	else{
		num_people = num_people + 1;
		document.getElementById("peoples").value = String(num_people);
	}
	numPeople = num_people;
	
	buttonFeedback();
	
}
function people_minus()
{
//	var num_people = Number(document.getElementById("peoples").value);
	var num_people = numPeople;
	
	if (num_people <= 0)
		{
			num_people = 0;
		}
	else{
		num_people = num_people - 1;
	}
	
	document.getElementById("peoples").value =  String(num_people);
	numPeople = num_people;
	
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
//similar with location
function addActivity2List(newActivity){
	console.log(newActivity);
	logging("Activity added : " + newActivity);
	try{
		if(curr_activity == num_activities - 1){
			console.log("new acttivity is input. add to list");
			try{
				actList.push(newActivity);
				console.log("Successfully add activity to list");
			}
			catch(e){
				console.log("error to add activity : " + e.message);
			}
		}
		else{
			console.log("already exist activitiy");
			console.log("actNew : " + actNew);
			console.log("newLocation : " + newActivity);
		}
		actList = actList.filter(Boolean);
		actList = actList.filter(function(item, pos, self){
			return self.indexOf(item) == pos;
		});
		actStream.write(actList.toString());
		actStream.close();
		console.log("Successfully added to activityList");
	}
	catch(e){
		console.log("error to check new : " + e.message);
	}
}

document.getElementById("savePAct").addEventListener("click",function(){
	var people = document.getElementById("peoples").value;
	var companion = document.getElementById("companions").value;
	activity = document.getElementById("activity").value;
	saveData("people",people);
	saveData("companion",companion);
	saveData("activity",activity);
	addActivity2List(activity);
	logging("People and Act Saved : people (" + people + ", " + companion + "), activity (" + activity + ")");
	
	surveyState = "health";
	buttonFeedback();
});

document.getElementById("toPage2").addEventListener("click", function(){
	surveyState = "location";
})
