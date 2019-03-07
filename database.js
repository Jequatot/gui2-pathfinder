var db;

function dpush() {
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

	newelem = firebase.database().ref("race").push("4")
	newelem.set({
		name: "Human",
		size: "Medium",
		speed: 30
	});
}

function db_load(data){
	db = data;
}