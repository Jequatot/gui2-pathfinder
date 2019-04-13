/*
  Copyright (C) 2019 Jeff Quattrociocchi, Sam Pickell, Stanley Chan, Peter Louisne
  UMass Lowell CS Students, COMP 4620 GUI II
  March 23, 2019
  GUI II Pathfinder Group 6, javascript for index page
*/

sessionStorage.SessionName = "Pathfinder"

function create_login() {
	document.getElementById("error").innerHTML = "";
	try {
		var un = document.getElementById("un_box").value;
		if(un == "")
			throw "Please provide a username.";
		
		var pw = document.getElementById("pw_box").value;
		if(pw == "")
			throw "Please provide a password.";
		
		id = push_user(un, pw);
		if(id == "ALREADY EXISTS")
			throw "There is already an account under that username.";
		sessionStorage.setItem("uid", id);
		window.location.href = "creator.html";
	} catch(err) {
		document.getElementById("error").innerHTML = err;
	}
}

function verify_login() {
	document.getElementById("error").innerHTML = "";
	try {
		var un = document.getElementById("un_box").value;
		if(un == "")
			throw "Please provide a username.";
		
		var pw = document.getElementById("pw_box").value;
		if(pw == "")
			throw "Please provide a password.";
		
		id = verify_user(un, pw);
		if(id == "INVALID")
			throw "Username/Password unrecognized.";
		sessionStorage.setItem("uid", id);
		window.location.href = "HTML/creator.html";
	} catch(err) {
		document.getElementById("error").innerHTML = err;
	}
}