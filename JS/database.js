var db;

function db_push(category, index, properties) {
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


	newelem = firebase.database().ref(category).child(index)
	newelem.set({
		name: properties[0],
		size: properties[1],
		speed: properties[2]
	});
}

function db_load(data){
	db = data;
}
