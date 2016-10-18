var fileStream, newFile, localPort = tizen.messageport.requestLocalMessagePort("SAMPLE_PORT_2"), remotePort = tizen.messageport.requestRemoteMessagePort("jA178rrw6Z.AccelerometerTutorial","SAMPLE_PORT_1"), personName, isDelay = false, delayTime, reason = "", handleID;
var delayDur = 5, watchID
var totDelay = 0;
var handleVib;

dataSt = new dataStruct();
debugger;

console.log("start logging");
startLogging();
console.log("logging is start : " + logFile);

personName = "John";

function whoAmI(){
	return personName;
}

function timePrint(time){
	var hour, minute, second, milSec;
	
	hour = time.getHours();
	minute = time.getMinutes();
	second = time.getSeconds();
	milSec = time.getMilliseconds();
	
	return hour.toString()+"_" + minute.toString() + "_" + second.toString() + "_" + milSec.toString();
}

function saveTime(){
	fileStream.write(timeStamp()+"\t");
}

checkDelayID = localPort.addMessagePortListener(function(data, remote){
	logging("delayData Received");
	result = data[0].value;
	if(result != 0){
		logging("move to reason page");
		totDelay = result;
		tau.changePage("after_snooze/index.html");
	} // if delay occurred
	else
		logging("Not delayed App");
});

startDate = getMonthDate(tizen.time.getCurrentDateTime());

function startSave(){
	
	buttonFeedback();
	tizen.filesystem.resolve("documents", 
		function(result){
			var startTime = tizen.time.getCurrentDateTime(), docuDir;
			docuDir = result;
			try{
				newDir = docuDir.createDirectory(startDate);
				docuDir = newDir.resolve(startDate);
			}
			catch(e){
				logging("error to resolve directory : " + e.message);
				console.log("error to resolve directory : " + e.message);
				docuDir = result.resolve(startDate);
			}
			try{
				newFile = docuDir.resolve("Survey_" + personName);
			}
			catch(e){
				logging("error to resolve file : " + e.message);
				console.log("error to resolve file : " + e.message);
				newFile = docuDir.createFile("Survey_" + personName);
			}
			logging("file open : " + newFile);
			newFile.openStream("a",
			function(fs){
				fileStream = fs;
				logging("Hello gear!");
				saveTime();
				
				reason = "for Test";
				if(isDelay){
					saveData("Delay","1");
					saveData("DelayTime", delayTime);
					saveData("DelayedTime",totDelay);
					saveData("Reason", reason);
				}
			}, function(e){
				logging("error to open stream : " + e.message);
			});
		}, function(error){
			logging("error to resolve documents directory : " + error.message);
		}, 'rw'
	);
	
	logging("Start survey");

	remotePort.sendMessage([{key:"command",value:"surveyStart"}],localPort);
	
	tizen.power.release("SCREEN");
	logging("Turn Off Screen");
	localPort.removeMessagePortListener(checkDelayID);
}

function endSave(){
	logging("Save End");
	dataSt.saveData(fileStream);
	fileStream.write("\n");
	fileStream.close();
}

function saveData(label, data){
//	fileStream.write(label+":"+data+",");
	dataSt.save2Struct(label, data);
}

$(window).load(function(){
	
	tizen.power.turnScreenOn();
	tizen.power.request("SCREEN", "SCREEN_NORMAL");
	logging("Turn On Screen");
	document.getElementById("startSurvey").addEventListener("click", startSave);

	( function () {
		window.addEventListener( 'tizenhwkey', function( ev ) {
			if( ev.keyName === "back" ) {
				var page = document.getElementsByClassName( 'ui-page-active' )[0],
					pageid = page ? page.id : "";
				if( pageid === "main" ) {
					try {
						if(fileStream != null)
							endSave();
						logging("Survey ended");
						endLogging();
						tizen.application.getCurrentApplication().exit();
					} catch (ignore) {
					}
				} else {
					window.history.back();
				}
			}
		} );
	} () );
	
	handleVib = window.setInterval(appStartVibe,1*1000);
	
	logging("logging is start : " + logFile);

	tizen.power.request("SCREEN", "SCREEN_NORMAL");
	logging("Current Screen is " + tizen.power.isScreenOn());
	remotePort.sendMessage([{key:"command",value:"checkDelayed"}],localPort);
	console.log("listener is " + watchID);
	
	//requestConnect();
});

function buttonFeedback(){
	navigator.vibrate(50);
	console.log("vibrate");
}

function delaySurvey(){
	//remotePort.sendMessage([{key:"command",value:"recordPause"}],localPort);
	remotePort.sendMessage([{key:"command",value:"postpone"},{key:"time",value:delayDur}],localPort);
	buttonFeedback();
	logging("delay survey");
	isDelay = true;
	delayTime = timeStamp();
	tizen.power.release("SCREEN");
	
	tizen.application.getCurrentApplication().exit();
	
//	handleID = window.setInterval(release, delayDur*tizen.alarm.PERIOD_MINUTE*1000);
}

function release(){
	tizen.application.launch(tizen.application.getAppInfo().id, function(){
		console.log("success");
	},function(error){console.log("fail to launch : " + error.message)});
	
	window.clearInterval(handleID);
	
	handleVib = window.setInterval(appStartVibe,15*1000);
	
	console.log("released");
}

function setDelay(value){
	delayDur = value;
	
	console.log("Set delay to " + value);
}

function setReason(reason2Delay){
	return reason2Delay+"("+delayDur+")";
}

function applyDelay(delayReason){
//	totDelay += delayDur;
	if(reason != ""){
		reason += ", " + delayReason+"("+totDelay+")";
	}
	else{
		reason = setReason(delayReason);
	}
}

function appStartVibe(){

	tizen.power.request("SCREEN", "SCREEN_NORMAL");
	logging("Current Screen is " + tizen.power.isScreenOn());
	
	navigator.vibrate([500,300,700]);
	window.clearInterval(handleVib);
	
	console.log("Let's Vibe");
}