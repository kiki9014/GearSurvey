//var watchID = localPort.addMessagePortListener(function(data, remote){
//});
try{
	//request sensing app to send current survey count
	remotePort.sendMessage([{key:"command",value:"surveyCnt"}],localPort);
	logging("call count");
}
catch(e){
	logging("error while send Count message : " + e.message);
}

document.getElementById("end_btn").addEventListener("click", function(){
	console.log("byebye");
//	locStream.close();
//	actStream.close();
	buttonFeedback();
	endSave(); //end response save
	logging("reset survey Timer");
	remotePort.sendMessage([{key:"command",value:"surveyEnd"}],localPort); //notify to sensing app that current survey is ended
	localPort.removeMessagePortListener(checkDelayID);
	
	console.log("End logging");
	endLogging(); //end logging
	console.log("End survey");
	tizen.application.getCurrentApplication().exit();
});