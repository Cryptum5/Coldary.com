function ImageClickFunction(id){
	window.open(id);
}
function CursorOver(state){
	if(state == true){
	document.body.style.cursor = "pointer";
	}else{
		document.body.style.cursor = "default";
	}
}