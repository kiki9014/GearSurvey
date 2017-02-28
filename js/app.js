var fileStream, newFile, localPort = tizen.messageport.requestLocalMessagePort("SAMPLE_PORT_2"), remotePort = tizen.messageport.requestRemoteMessagePort("jA178rrw6Z.AccelerometerTutorial","SAMPLE_PORT_1"), personName, isDelay = false, delayTime, reason = "", handleID;
var delayDur = 5, watchID
var totDelay = 0;
var handleVib;
var surveyState = "start";

dataSt = new dataStruct();
debugger;

console.log("start logging");
startLogging();
console.log("logging is start : " + logFile);

//나중에 사용자에게 이름을 직접 입력 받는 방식으로 변경
personName = "John";

//unused function
function whoAmI(){
	return personName;
}

//print current time
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
//message port receiver function. communicate with sensing app
checkDelayID = localPort.addMessagePortListener(function(data, remote){
	logging("get response from sensing app : " + surveyState);
	if (surveyState == "start"){
		logging("delayData Received");
		result = data[0].value;
		if(result != 0){
			logging("move to reason page");
			totDelay = result;
			tau.changePage("after_snooze/index.html");
		} // if delay occurred
		else
			logging("Not delayed App");
	}
	else if(surveyState=="health"){ //used in page 4
		logging("data received");
		logging(data);
		result = data;
		if(result <= 0){
			console.log("result is under 0");
			window.alert("Initializinig HRM.\n Please wait and retry again");
			remotePort.sendMessage([{key:"command",value:"heartRate"}],localPort);
		} //less than 0 means sensing app cannot read HR
		document.getElementById("heart_rate").setAttribute("value", data[0].value);
	}
	else if(surveyState=="end"){ //show current survey count
		logging("get count");
		logging("get Current count : " + data[0].value);
		document.getElementById("num_logs").setAttribute("value", data[0].value);
	}
	else {
		logging("wrong situation : " + surveyState);
	}
});

startDate = getMonthDate(tizen.time.getCurrentDateTime());
//applied to every radio button
function getValueFromRadio(name){
	var objList = document.getElementsByName(name);
	console.log(objList);
	var checkedValue=-99; //-99 means undefined (not choosed by user)
	numObj = objList.length;
	for (i = 0 ; i<numObj; i++){
		obj = objList[i];
		if (obj.checked == true){
			checkedValue = obj.value;
			console.log("checked");
		}
	}
	
	console.log("radio button value : " + checkedValue);
	return checkedValue;
}

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
				if(isDelay){ //if survey has been delayed more than 0
					saveData("Delay","1");
					saveData("DelayTime", delayTime); //recent delayed time
					saveData("DelayedTime",totDelay); //total delayed time between current survey and previous survey
					saveData("Reason", reason); //recent reason to delay
				}
			}, function(e){
				logging("error to open stream : " + e.message);
			});
		}, function(error){
			logging("error to resolve documents directory : " + error.message);
		}, 'rw'
	);
	
	logging("Start survey");

	remotePort.sendMessage([{key:"command",value:"surveyStart"}],localPort); //send start flag to sensing app 
	
	tizen.power.release("SCREEN"); //release screen state because user replied to survey
	logging("Turn Off Screen");
	surveyState = "location";
}

function endSave(){
	logging("Save End");
	dataSt.saveData(fileStream);
	fileStream.write("\n");
	fileStream.close();
}

function saveData(label, data){
	dataSt.save2Struct(label, data);
}

$(window).load(function(){
	
	tizen.power.turnScreenOn();
	tizen.power.request("SCREEN", "SCREEN_NORMAL");	//Turn on the screen by force to alarm
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

	tizen.power.request("SCREEN", "SCREEN_NORMAL");	//Turn on the screen by force to alarm. one more check
	logging("Current Screen is " + tizen.power.isScreenOn());
	remotePort.sendMessage([{key:"command",value:"checkDelayed"}],localPort); //check whether survey has delayed before
	console.log("listener is " + watchID);
	
});

function buttonFeedback(){
	navigator.vibrate(50);
	console.log("vibrate");
}

function delaySurvey(){
	remotePort.sendMessage([{key:"command",value:"postpone"},{key:"time",value:delayDur}],localPort);
	buttonFeedback();
	logging("delay survey");
	isDelay = true;
	delayTime = timeStamp();
	tizen.power.release("SCREEN");
	
	tizen.application.getCurrentApplication().exit();
	
}

//not used now
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
	if(reason != ""){
		reason += ", " + delayReason+"("+totDelay+")";
	}
	else{
		reason = setReason(delayReason);
	}
}
//notify by vibration
function appStartVibe(){

	tizen.power.request("SCREEN", "SCREEN_NORMAL");
	logging("Current Screen is " + tizen.power.isScreenOn());
	
	navigator.vibrate([500,300,700]);
	window.clearInterval(handleVib);
	
	console.log("Let's Vibe");
}