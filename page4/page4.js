var result;
var watchID = localPort.addMessagePortListener(function(data, remote){
	logging("data received");
	logging(data);
	result = data;
	if(result <= 0){
		console.log("result is under 0");
		window.alert("Initializinig HRM.\n Please wait and retry again");
		remotePort.sendMessage([{key:"command",value:"heartRate"}],localPort);
	}
	document.getElementById("heart_rate").setAttribute("value", data[0].value);
});

remotePort.sendMessage([{key:"command",value:"heartRate"}],localPort);
logging("data transmitted");

document.getElementById("saveHealth").addEventListener("click", function(){
	var HR = document.getElementById("heart_rate").getAttribute("value"), imoji = getValueFromRadio("health");
	
	saveData("HeartRate", HR);
	saveData("Health", imoji);
	localPort.removeMessagePortListener(watchID);
	
	logging("save Health Data");
	
	buttonFeedback();
});

document.getElementById("getHR").addEventListener("click", function(){
	buttonFeedback();
	remotePort.sendMessage([{key:"command",value:"heartRate"}],localPort);
	
});