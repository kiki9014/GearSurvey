

document.getElementById("saveFeeling").addEventListener("click", function(){
//	var arousal = document.getElementById("arousal").value, happiness = document.getElementById("happiness").value;
	var arousal = getValueFromRadio("arousal");
	var happiness = getValueFromRadio("happiness");
	
	saveData("Activeness", arousal);
	saveData("Happiness", happiness);
	
	logging("save feeling");
	
	buttonFeedback();
});
