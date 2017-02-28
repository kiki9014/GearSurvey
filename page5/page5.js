

document.getElementById("saveFeeling").addEventListener("click", function(){
	var arousal = getValueFromRadio("arousal");
	var happiness = getValueFromRadio("happiness");
	
	saveData("Activeness", arousal);
	saveData("Happiness", happiness);
	
	logging("save feeling");
	
	surveyState = "mood_2";
	
	buttonFeedback();
});

document.getElementById("toPage4").addEventListener("click", function(){
	surveyState = "health";
	
	logging("goTohealth");
	
	buttonFeedback();
})