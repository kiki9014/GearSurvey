var activities = ["attending lectures","having a meal","studying","taking a rest","walking","having a talk"];
var num_activities = activities.length;
var curr_activity = -1;
var actStream,isLoadedAct = false;

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
			}, function(e){
				logging("error for reading : " + e.message);
			});
		}, function(e){
			logging("error for opening : " + e.message);
		});
	}, function(e){
		logging("error to resolve private folder : " + e.message);
	}, "rw");
}

var actList = [], callFlag;

loadActivity = function (){
	console.log("call loadFunction");
	window.clearInterval(callFlag);
	if (!isLoadedAct){
		console.log("Not fully called");
		getActivityList();
		callFlag = window.setInterval(loadActivity, 1000);
	}
	else{
		console.log("successfully loaded function for activity list");
	}
};

try{
	callFlag = window.setInterval(loadActivity, 1000);
	console.log("callFlag : " + callFlag);
}
catch(e){
	console.log("error to set interval for loadActivity : " + e.message);
}

//actList = activities;

try{
	console.log("load page3_1");
	var actSize = actList.length;
	var actIter = actSize;
	var actElem = document.getElementById("activity");
	var defaultValue = "Enter activity";
	var actNew = defaultValue;
	console.log("load page3_2");
	
	document.getElementById("savePAct").addEventListener("click",function(){
		var companion = document.getElementById("companions").value, newActivity = document.getElementById("activity").value;
		saveData("Companion",companion);
		saveData("Activity",newActivity);
		logging("People and Act Saved");
		
		if(newActivity.localeCompare(actNew)==0){
			console.log("new Location is input. add to list");
			try{
				actList.push(actNew);
				console.log("Successfully added activity to list");
			}
			catch(e){
				console.log("error when add new activity to actList : " + e.message);
			}
		}
		else{
			console.log("already exist activity");
			console.log("actNew : " + actNew);
			console.log("newActivity : " + newActivity);
		}

		actList = actList.filter(Boolean);
		actStream.write(actList.toString());
		actStream.close();
		buttonFeedback();
	});
}
catch(err){
	console.log("error when register listener : " + err.message);
}

function plus()
{
	var num_people = parseInt(document.getElementById("companions").getAttribute("value"));
	
//	if (num_people >= 8)
//		{
//			num_people = 9;
//			
//			document.getElementById("companions").setAttribute("value", String(num_people)+"+");
//		}
//	else{
		num_people = num_people + 1;
		
		document.getElementById("companions").setAttribute("value", String(num_people));
//	}
	
	buttonFeedback();
	
}
function minus()
{
	var num_people = parseInt(document.getElementById("companions").getAttribute("value"));
	
	if (num_people <= 0)
		{
			num_people = 0;
		}
	else{
		num_people = num_people - 1;
	}
	
	document.getElementById("companions").setAttribute("value", String(num_people));	
	
	buttonFeedback();
}

function left(){
	actIter = actIter - 1;
	if(actIter < 0){
		actIter = actSize;
		actElem.value = actNew;
		actElem.disabled = false;
	}
	else{
		actElem.value = actList[actIter];
		actElem.disabled = true;
	}
	
	buttonFeedback();
} 
function right(){
	actIter = actIter + 1;
	if(actIter > actSize)
		actIter = 0;
	if(actIter == actSize){
		actElem.value = actNew;
		actElem.disabled = false;
	}
	else{
		actElem.value = actList[actIter];
		actElem.disabled = true;
	}
	
	buttonFeedback();
}
///////////////////////////////////////////////////////////////////////////////////////



var plus_btn = document.getElementById("plus_btn");
if (plus_btn !== null){
	plus_btn.addEventListener("click", plus, false);
}
var minus_btn = document.getElementById("minus_btn");
if (minus_btn !== null){
	minus_btn.addEventListener("click", minus, false);
}
var left_btn = document.getElementById("left_btn");
if (left_btn !== null){
	left_btn.addEventListener("click", left, false);
}
var right_btn = document.getElementById("right_btn");
if (right_btn !== null){
	right_btn.addEventListener("click", right, false);
}

function changeActivity(){
	if(!actElem.disabled)
		actNew = actElem.value;
	console.log(actNew);
}
actElem.addEventListener("change", changeActivity);

console.log("load page3");
