

document.getElementById("saveCurrentStat").addEventListener("click", function(){
	var currHealth = getValueFromRadio("abs_health");
	var currArousal = getValueFromRadio("abs_activeness");
	var currHappiness = getValueFromRadio("abs_happiness");
	
	saveData("currHealth", currHealth);
	saveData("currActiveness", currArousal);
	saveData("currHappiness", currHappiness);
	
	logging("save current status.");
	
	surveyState = "end";
	
	buttonFeedback();
});

document.getElementById("toPage5_1").addEventListener("click", function(){
	surveyState = "mood";
	
	buttonFeedback();
})