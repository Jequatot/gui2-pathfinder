function print(){
	console.log(db.Race.length)
	for(i = 0; i < db.Race.length; i++) {
		result = "<div>NAME:" + db.Race[i].Name + "<\div>";
		result += "<div>SIZE:" + db.Race[i].Size + "<\div>";
		result += "<div>SPEED:" + db.Race[i].Speed + "<\div>";
		result += "========";
		document.getElementById("racediv").innerHTML += result;
	}

}