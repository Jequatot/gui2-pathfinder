function print(){
	console.log(db.race.length)
	for(i = 0; i < db.race.length; i++) {
		console.log(db.race[i].name)
		console.log(db.race[i].size)
		console.log(db.race[i].speed)
		result = "<div>NAME:" + db.race[i].name + "<\div>";
		result += "<div>SIZE:" + db.race[i].size + "<\div>";
		result += "<div>SPEED:" + db.race[i].speed + "<\div>";
		result += "========";
		document.getElementById("racediv").innerHTML += result;
	}

}