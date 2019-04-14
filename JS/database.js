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

function verify_user(name, pwd) {
	for(i = 0; i < db.login.user.length; i++) {
		if(db.login.user[i].name == name
			&& db.login.user[i].pwd == pwd) {
				return db.login.user[i].uid;
		}
	}
	return "INVALID";
}

function push_user(_name, _pwd) {
	for(i = 0; i < db.login.user.length; i++) {
		if(db.login.user[i].name == _name) {
				return "ALREADY EXISTS";
		}
	}
	dbref = push_init();
	newuser = dbref.ref("login/user").child(db.login.user.length);

	var _uid;
	do {
		_uid = "";
	for(i = 0; i < 8; i++) {
		_uid += String.fromCharCode(48 + Math.floor(Math.random()*74))
		}
	} while(db.login.user.includes(_uid))

	newuser.set({
		name: _name,
		pwd: _pwd,
		uid: _uid
	});
	return _uid;
}

function get_username(_uid) {
	for(i = 0; i < db.login.user.length; i++) {
		if(db.login.user[i].uid == _uid) {
			return db.login.user[i].name;
		}
	}
	return "NOT FOUND";
}

function get_class(_name) {
	var arr = db.rule.class;
	for(i = 0; i < arr.length; i++) {
		if(arr[i].name == _name) {
			return arr[i];
		}
	}
	return "NOT FOUND";
}

function get_race(_name) {
	var arr = db.rule.race;
	for(i = 0; i < arr.length; i++) {
		if(arr[i].name == _name) {
			return arr[i];
		}
	}
	return "NOT FOUND";
}

function get_pc(_uid, _name) {
	var arr = db.pc;
	for(i = 0; i < arr.length; i++) {
		if(arr[i].name == _name && arr[i].uid == _uid) {
			return arr[i];
		}
	}
	return "NOT FOUND";
}