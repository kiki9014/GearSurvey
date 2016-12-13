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
	logging("reset survey Timer");
	remotePort.sendMessage([{key:"command",value:"surveyEnd"}],localPort);
	localPort.removeMessagePortListener(watchID);
	
	console.log("End logging");
	endLogging();
	console.log("End survey");
	tizen.application.getCurrentApplication().exit();
});