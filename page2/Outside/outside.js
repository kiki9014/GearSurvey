var locate;
var locList = document.getElementsByName("radioset");

for(var i=0; i<locList.length; i++){
	locID = locList.item(i).id;
	logging("location ID is " + locID);
	locList.item(i).onclick = function(){
		locate = this.id;
		logging("Location Changed : " + locate);
		
		buttonFeedback();
	}
	logging("onClick Set");
}

locate = locList.item(0).id;

document.getElementById("saveLocate").addEventListener("click",function(){
	saveData("Location",locate);
	logging("Location Saved");
	
	buttonFeedback();
});

function addLocation(){
	locate="lawn";
	buttonFeedback();
	document.getElementById("new_location_out").setAttribute("value", locate);
}

document.getElementById("add_btn_out").addEventListener("click",addLocation);