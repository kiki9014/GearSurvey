function saveReason(){
	reason = document.getElementById("reason").value;
	applyDelay(reason);
	buttonFeedback();
	logging("Reason to postpone : " + reason);
}

document.getElementById("delayReason").addEventListener("click", saveReason);