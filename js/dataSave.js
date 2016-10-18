function dataStruct () {
	"use strict";
//	this.location = "none";
//	this.companion = 0;
//	this.activity = "none";
//	this.heartRate = 0;
//	this.health = 0;
//	this.arousal = 0;
//	this.happiness = 0;
	this.save2Struct = function(type, value){
		this[type] = value;
	};
	this.saveData = function(fileStream){
		if(totDelay >= 5){
			logging("Delayed Survey : " + totDelay);
			fileStream.write("delay:");
			fileStream.write(this.Delay);
			fileStream.write(",delayedTime:");
			fileStream.write(this.DelayTime);
			fileStream.write(",reason:");
			fileStream.write(this.Reason);
			fileStream.write(",");
		}
		fileStream.write("location:");
		fileStream.write(this.Location);
		fileStream.write(",companion:");
		fileStream.write(this.Companion);
		fileStream.write(",activity:");
		fileStream.write(this.Activity);
		fileStream.write(",heartRate:");
		fileStream.write(this.HeartRate);
		fileStream.write(",health:");
		fileStream.write(this.Health);
		fileStream.write(",awakeness:");
		fileStream.write(this.Arousal);
		fileStream.write(",happiness:");
		fileStream.write(this.Happiness);
	};
}