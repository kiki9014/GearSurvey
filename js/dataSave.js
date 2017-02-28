function dataStruct () {
	"use strict";
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
		fileStream.write(",people:");
		fileStream.write(this.people);
		fileStream.write(",companion:");
		fileStream.write(this.companion);
		fileStream.write(",activity:");
		fileStream.write(this.activity);
		fileStream.write(",heartRate:");
		fileStream.write(this.HeartRate);
		fileStream.write(",health:");
		fileStream.write(this.Health);
		fileStream.write(",awakeness:");
		fileStream.write(this.Activeness);
		fileStream.write(",happiness:");
		fileStream.write(this.Happiness);
		fileStream.write(",currHealth:");
		fileStream.write(this.currHealth);
		fileStream.write(",currActiveness:");
		fileStream.write(this.currActiveness);
		fileStream.write(",currHappiness:");
		fileStream.write(this.currHappiness);
	};
}