document.getElementById("saveFeeling").addEventListener("click", function(){
	var arousal = document.getElementById("arousal").value, happiness = document.getElementById("happiness").value;
	
	saveData("Arousal", arousal);
	saveData("Happiness", happiness);
	
	logging("save feeling");
	
	buttonFeedback();
});