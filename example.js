function print(){
	console.log(db.race.length)
	for(i = 0; i < db.race.length; i++) {
		result = "<div>NAME:" + db.race[i].name + "<\div>";
		result += "<div>SIZE:" + db.race[i].size + "<\div>";
		result += "<div>SPEED:" + db.race[i].speed + "<\div>";
		result += "========";
		document.getElementById("racediv").innerHTML += result;
	}
}

function push_human() {
	db_push("race", db.race.length, ["Human", "Medium", 30])
}