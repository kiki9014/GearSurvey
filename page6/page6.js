var watchID = localPort.addMessagePortListener(function(data, remote){
	document.getElementById("num_logs").setAttribute("value", data[0].value);
});

remotePort.sendMessage([{key:"command",value:"surveyCnt"}],localPort);

document.getElementById("end_btn").addEventListener("click", function(){
	console.log("byebye");
//	locStream.close();
//	actStream.close();
	buttonFeedback();
	endSave();
	logging("End survey");
	endLogging();
	remotePort.sendMessage([{key:"command",value:"surveyEnd"}],localPort);
	localPort.removeMessagePortListener(watchID);
	
	tizen.application.getCurrentApplication().exit();
});