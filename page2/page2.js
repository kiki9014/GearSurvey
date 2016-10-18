var locStream;
var isLoadedLoc = false;

console.log("Page 2");

function getLocationList(){
	var list = [];
	isLoadedLoc = true;
	tizen.filesystem.resolve("wgt-private", function(result){
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

console.log("Page2_1");

var locList = [], callFlag;
console.log("Page2_2");

loadLocation = function (){
	console.log("call loadFunction");
	window.clearInterval(callFlag);
	if (!isLoadedLoc){
		console.log("Not fully called");
		locList = getLocationList();
		callFlag = window.setInterval(loadLocation, 1000);
	}
	else{
		console.log("successfully loaded function for location list");
	}
};

try{
	callFlag = window.setInterval(loadLocation, 1000);
	console.log("callFlag : " + callFlag);
}
catch(e){
	console.log("error to set interval for loadLocation : " + e.message);
}


//var locList = ["Lab", "Room"];
try{
	var locSize = locList.length;
	var locIter = locSize;
	var locElem = document.getElementById("new_location");
	var defaultValue = "Enter location";
	var locNew = defaultValue;
	
	function saveLocation(){
		newLocation = document.getElementById("new_location").value;
		console.log(newLocation);
		saveData("Location",newLocation);
		buttonFeedback();
		logging("Location saved : " + newLocation);
		try{
			if(newLocation.localeCompare(locNew)==0){
				console.log("new Location is input. add to list");
				try{
					locList.push(locNew);
					console.log("Successfully add location to list");
				}
				catch(e){
					console.log("error to add location : " + e.message)
				}
			}
			else{
				console.log("already exist location");
				console.log("locNew : " + locNew);
				console.log("newLocation : " + newLocation);
			}
			locList = locList.filter(Boolean);
			locStream.write(locList.toString());
			locStream.close();
			console.log("Successfully save locationList");
		}
		catch(e){
			console.log("error to check new : " + e.message);
		}
//		save2Struct("location",newLocation);
	}

	function left_loc(){
		locIter = locIter - 1;
		if(locIter < 0){
			locIter = locSize;
			locElem.value = locNew;
			locElem.disabled = false;
		}
		else{
			locElem.value = locList[locIter];
			locElem.disabled = true;
		}
		
		buttonFeedback();
	}

	function right_loc(){
		locIter = locIter + 1;
		if(locIter > locSize)
			locIter = 0;
		if(locIter == locSize){
			locElem.value = locNew;
			locElem.disabled = false;
		}
		else{
			locElem.value = locList[locIter];
			locElem.disabled = true;
		}
		
		buttonFeedback();
	}

	function changeLocation(){
		if(!locElem.disabled)
			locNew = locElem.value;
		console.log(locNew);
	}
	document.getElementById("saveLocate").addEventListener("click", saveLocation);
	locElem.addEventListener("change", changeLocation);
	document.getElementById("left_btn_loc").addEventListener("click", left_loc);
	document.getElementById("right_btn_loc").addEventListener("click", right_loc);
}
catch(e){
	console.log("error to load page 2 : " + e.message);
}