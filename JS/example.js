function print(){
	result = ""
	for(i = 0; i < db.rule.race.length; i++) {
		thisRace = db.rule.race[i];
		result += "<div>NAME: " + thisRace.name + "<\div>";
		result += "<div>SIZE: " + thisRace.size + "<\div>";
		result += "<div>SPEED: " + thisRace.speed + "<\div>";
		result += "<div>LANGUAGES: "
		for(j = 0; j < thisRace.language.length; j++) {
			thisLang = thisRace.language[j];
			result += db.rule.language[thisLang].name + ", ";
		}
		result +=  "<\div>"
		result += "========";
	}
	document.getElementById("racediv").innerHTML = result;
}

function push_human() {
	//function push_pc(name, scores, pclass, race, level, feats, skills, spells, uid, publicity)
	push_pc("Rafael2", [10, 11, 10, 10, 10, 10], 0, 0, 1, [], [0], [], "b0d00b0d", 0);
}