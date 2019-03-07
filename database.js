var db;

function db_init(uid) {
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


	class pclass{
		constructor(name, desc){
			this.name = name;
			this.desc = desc;
		}
	}

	var db_class = new Array();

	db.ref("class").once("value").then(
		function(classlist) {
			classlist.forEach(function(childclass) {
				db_class.push(new pclass(childclass.child("name").val(), childclass.child("desc").val()));
			});
		});
	return db_class
}

function db_load(data){
	db = data;
}