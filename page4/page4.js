
//request to sensing app for heartrate
remotePort.sendMessage([{key:"command",value:"heartRate"}],localPort);
logging("data transmitted");

document.getElementById("saveHealth").addEventListener("click", function(){
	var HR = document.getElementById("heart_rate").getAttribute("value"), imoji = getValueFromRadio("health");
	
	saveData("HeartRate", HR);
	saveData("Health", imoji);
//	localPort.removeMessagePortListener(watchID);
	
	logging("save Health Data");
	
	surveyState = "mood_1";
	
	buttonFeedback();
});

document.getElementById("getHR").addEventListener("click", function(){
	buttonFeedback();
	remotePort.sendMessage([{key:"command",value:"heartRate"}],localPort);
	
});

document.getElementById("toPage3").addEventListener("click", function(){
	surveyState = "peopleAct";
	buttonFeedback();
})