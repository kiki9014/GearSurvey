

document.getElementById("saveCurrentStat").addEventListener("click", function(){
//	var arousal = document.getElementById("arousal").value, happiness = document.getElementById("happiness").value;
	var currHealth = getValueFromRadio("abs_health");
	var currArousal = getValueFromRadio("abs_activeness");
	var currHappiness = getValueFromRadio("abs_happiness");
	
	saveData("currHealth", currHealth);
	saveData("currActiveness", currArousal);
	saveData("currHappiness", currHappiness);
	
	logging("save current status.");
	
	buttonFeedback();
});