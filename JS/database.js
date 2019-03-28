var db;

function push_pc(name, scores, pclass, race, level, feats, skills, spells, uid, publicity) {
	dbref = push_init();
	newelem = dbref.ref("pc").child(db.pc.length)
	newelem.set({
		name: name,
	    scores : scores,
	    class : pclass,
	    race : race,
	    level : level,
	    feats : feats,
	    skills : skills,
	    spells : spells,
	    uid : uid,
	    public : publicity
	});
}

function push_init() {
	
	return firebase.database()
}

function db_load(data){
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDFA65nznccdfEIbttyfCl1LHt40PD-Jpc",
		authDomain: "gui-2-pathfinder.firebaseapp.com",
		databaseURL: "https://gui-2-pathfinder.firebaseio.com",
		projectId: "gui-2-pathfinder",
		storageBucket: "gui-2-pathfinder.appspot.com",
		messagingSenderId: "713095954145"
	};

	firebase.initializeApp(config);
	
	db = data;
}
