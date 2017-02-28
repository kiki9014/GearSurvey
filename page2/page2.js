var locations = ["식당","카페","도서관","강의실","연구실","실험실","기숙사","직접입력"];
var num_locations = locations.length;
var curr_location = -1;
locElem = document.getElementById("location");

var locStream;
var isLoadedLoc = false;

console.log("Page2_1");

var locList = [], callFlag;
//update location list
function updateList(list){
	for (i = 0 ; i < list.length; i++){
		console.log(list[i]);
		if (list[i].length != 0)
			locations.push(list[i]);
	}
	num_locations = locations.length;
	console.log(locations);
}
//read location list from file
function getLocationList(){
	var list = [];
	isLoadedLoc = true;
	tizen.filesystem.resolve("wgt-private", function(result){ //file in wgt-private cannot read from external access and it will erase file
		dir = result;
		try{
			locFile = dir.resolve("location.txt");
		}
		catch(e){
			logging("error to resolve file : " + e.message);
			console.log("error to resolve file : " + e.message);
			locFile = dir.createFile("location.txt");
		}
		locFile.openStream("rw",function(fs){
			locStream = fs;
			locFile.readAsText(function(str){
				locList = str.split(',');
				locSize = locList.length;
				console.log("Successfully import");
				updateList(locList);
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

console.log("Page2_2");
//In sometimes, getLocationList is not called, loadLocation function is called repeatedly until getLocationList is called
loadLocation = function (){
	console.log("call loadFunction");
	window.clearInterval(callFlag);
	if (!isLoadedLoc){
		console.log("Not fully called");
		locList2 = getLocationList();
		callFlag = window.setInterval(loadLocation, 1000);
	}
	else{
		console.log("successfully loaded function for location list");
	}
};

callFlag = window.setInterval(loadLocation, 1000);

function check_loc(){
	if (curr_location==7) //if current string is "직접 입력"
		locElem.disabled = false; //user can enter location
	else
		locElem.disabled = true;
}

function left_loc(){
	if (curr_location === -1 || curr_location === 0  ) {
		curr_location = num_locations - 1;
	} else {
		curr_location = curr_location -1;
	}
	
	check_loc();
	document.getElementById("location").value = locations[curr_location];//
	
	buttonFeedback();
} 

function right_loc(){
	if (curr_location === -1 || curr_location === num_locations - 1 ) {
		curr_location = 0;
	
	} else {
		curr_location = curr_location + 1;
	}

	check_loc();
	
	document.getElementById("location").value = locations[curr_location];
	
	buttonFeedback();
}

var left_btn = document.getElementById("left_btn_loc");
if (left_btn !== null){
	left_btn.addEventListener("click", left_loc, false);
}
var right_btn = document.getElementById("right_btn_loc");
if (right_btn !== null){
	right_btn.addEventListener("click", right_loc, false);
}

function addLocation2List(newLocation){
	console.log(newLocation);
	logging("Location added : " + newLocation);
	try{
		if(curr_location == num_locations - 1){ //current iterator of location is pointing newly entered location
			console.log("new Location is input. add to list");
			try{
				locList.push(newLocation);
				console.log("Successfully add location to list");
			}
			catch(e){
				console.log("error to add location : " + e.message);
			}
		}
		else{
			console.log("already exist location");
			console.log("newLocation : " + newLocation);
		}
		locList = locList.filter(Boolean); //remove empty space
		locList = locList.filter(function(item, pos, self){
			return self.indexOf(item) == pos; //remove duplicated location
		});
		locStream.write(locList.toString());
		locStream.close();
		console.log("Successfully added to locationList");
	}
	catch(e){
		console.log("error to check new : " + e.message);
	}
}
//save response of location and move to next page
function saveLocation() {
	locationVal = document.getElementById("location").value;
	saveData("Location", locationVal);
	logging("Location Saved : " + locationVal);
	
	addLocation2List(locationVal);
	
	console.log(locList);
	surveyState = "peopleAct";
	
	buttonFeedback();
}

function returnToPage1(){
	buttonFeedback();
	surveyState = "start";
}

document.getElementById("saveLocation").addEventListener("click",saveLocation);
document.getElementById("toPage1").addEventListener("click", returnToPage1);
