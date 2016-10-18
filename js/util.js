var logStream, logDir, logFile;

function timeStamp(){
	var month, date, hour, minute, second, milSec, time = tizen.time.getCurrentDateTime();
	
	month = time.getMonth()+1;
	date = time.getDate();
	hour = time.getHours();
	minute = time.getMinutes();
	second = time.getSeconds();
	milSec = time.getMilliseconds();
	
	return month.toString() + "_" + date.toString() + "_" + hour.toString() + "_" + minute.toString() + "_" + second.toString() + "_" + milSec.toString();
}

function getMonthDate(time){
	var month, date;
	
	month = time.getMonth()+1;
	date = time.getDate();
	
	return month.toString() + "_" + date.toString();
}

function startLogging (){
	tizen.filesystem.resolve("documents",
		function(dir){
			logDir = dir;
			try{
				logFile = logDir.resolve("SurveyLog_" + whoAmI() + ".txt");
			}
			catch(e){
				logFile = logDir.createFile("SurveyLog_" + whoAmI() + ".txt");
			}
			logFile.openStream('a',
			function(stream){
				logStream = stream;
				console.log("1Stream is " + logStream);
			}, function(error){
				console.log("Error : " + error);
			});
			console.log("2Stream is " + logStream);
		}, function(error) {
		console.log("Error : " + error);
		}, 'rw'
	);
	console.log("Logging file is " + logFile);
}

function logging(log){
	console.log("logging to " + logStream);
	logStream.write(timeStamp() + " : " + log +"\n");
	console.log("logging : " + log);
}

function endLogging(){
	logStream.close();
}