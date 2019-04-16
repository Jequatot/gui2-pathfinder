/*
  Copyright (C) 2019 Jeff Quattrociocchi, Sam Pickell, Stanley Chan, Peter Louisne
  UMass Lowell CS Students, COMP 4620 GUI II
  March 23, 2019
  GUI II Pathfinder Group 6, javascript
*/
//temporary global variables
var player_class, player_race
//Enables jqueryui tab functionality
$(function(){
    $("#tabs").tabs();
});

//populate the class chart
function add_to_class_chart() {
	var cltab = document.getElementById("class_table");
	for(i = 0; i < db.rule.class.length; i++) {
		var clrow = document.createElement("tr");

		var nodes = [4];

		for(j = 0; j < 4; j++){
			nodes[j] = document.createElement("td");
		}
		classname = db.rule.class[i].name;
		nodes[0].innerHTML =
		"<input type='radio' id='Class_" + classname + "_Input' name='Class_Selection' value='" + i + "' onclick='change_class()'>";
		nodes[1].innerHTML = classname;
		nodes[2].innerHTML = db.rule.class[i].short_desc;
		nodes[3].innerHTML =
		"<button type='button' class =\"view_button\" id=\"vb_class_" + classname + "\">Details</button>";


		for(j = 0; j < 4; j++){
			clrow.appendChild(nodes[j])
		}
		cltab.appendChild(clrow);
	}
}
//populate the race chart
function add_to_race_chart() {
	var ratab = document.getElementById("race_table");
	for(i = 0; i < db.rule.race.length; i++) {
		var rarow = document.createElement("tr");

		var nodes = [4];

		for(j = 0; j < 4; j++){
			nodes[j] = document.createElement("td");
		}
		racename = db.rule.race[i].name;
		nodes[0].innerHTML =
		"<input type='radio' id='Race_" + racename + "_Input' name='Race_Selection' value='" + i + "' onclick='change_race()'>";
		nodes[1].innerHTML = racename;
		nodes[2].innerHTML = db.rule.race[i].short_desc;
		nodes[3].innerHTML =
		"<button type='button' class=\"view_button\" id=\"vb_race_" + racename + "\">Details</button>";


		for(j = 0; j < 4; j++){
			rarow.appendChild(nodes[j])
		}
		ratab.appendChild(rarow);
	}
}

//Populate Feat Chart
function add_to_feat_chart()
{

  //Grab the info from the textboxes
  var feat_name = document.getElementById("feat_name_textbox").value;
  var feat_prereq = document.getElementById("feat_preq_textbox").value;
  var feat_benefit = document.getElementById("feat_benefit_textbox").value;

  //Create divs for each entry
  var name_entry = "<div id=\""+feat_name+"\"class=\"name_box\"><p>"+feat_name+"</p></div>";
  var prereq_entry = "<div id=\""+feat_prereq+"\"class=\"name_box\"><p>"+feat_prereq+"</p></div>";;
  var benefit_entry = "<div id=\""+feat_benefit+"\"class=\"name_box\"><p>"+feat_benefit+"</p></div><br></br>";;

  //Add the entries to the chart
  $("#Feat_Chart").append(name_entry+prereq_entry+benefit_entry).value;
}


function user(uid) {
	for(j = 0; j < db.login.user.length; j++) {
		if(uid == db.login.user[j].uid)
			return db.login.user[j];
	}
	return null;
}

// Characters
var pctab = document.getElementById("pc_table");
for(i = 0; i < db.pc.length; i++) {
	var pcrow = document.createElement("tr");

	var nodename = document.createElement("td");
	var nodelevel = document.createElement("td");
	var noderace = document.createElement("td");
	var nodeclass = document.createElement("td");
	var nodeowner = document.createElement("td");
	var nodeperm= document.createElement("td");
	var nodebutton= document.createElement("td");

	nodename.innerHTML = db.pc[i].name;
	nodelevel.innerHTML = db.pc[i].level;
	noderace.innerHTML = db.rule.race[db.pc[i].race].name;
	nodeclass.innerHTML = db.rule.class[db.pc[i].class].name;
	nodeowner.innerHTML = user(db.pc[i].uid).name;
	nodeperm.innerHTML = db.pc[i].public == 1 ? "Public" : "Private";
	nodebutton.innerHTML =
	"<button type='button' class =\"view_button\" id=\"vb_" + db.pc[i].uid + "_" + db.pc[i].name + "\">View</button><button type='button' disabled>Edit</button><button type='button' disabled>Delete</button>";


	pcrow.appendChild(nodename);
	pcrow.appendChild(nodeclass);
	pcrow.appendChild(noderace);
	pcrow.appendChild(nodelevel);
	pcrow.appendChild(nodeowner);
	pcrow.appendChild(nodeperm);
	pcrow.appendChild(nodebutton);
	pctab.appendChild(pcrow);
}

// add player classes
add_to_class_chart();
add_to_race_chart();

// view button to see modal to pop out
  var btns = document.getElementsByClassName("view_button");
  var modal =  document.getElementById('modal_popout');
  var modal_title =  document.getElementById('title_portion');
  var modal_body =  document.getElementById('info_body');
  var span = document.getElementsByClassName("close")[0];
// button clicked
for(let i=0;i<btns.length;i++){
	btns[i].onclick = function() {
		vbid = btns[i].id.split("_");
		modal.style.display = "block";

		if(vbid[1] == "class") {
			selection = get_class(vbid[2]);
			modal_title.innerHTML = selection.name;
			modal_body.innerHTML = "<p>" + selection.name + "<br/>" + selection.long_desc + "</p>";

		} else if(vbid[1] == "race") {
			selection = get_race(vbid[2]);
			modal_title.innerHTML = selection.name;
			modal_body.innerHTML = "<p>" + selection.name + "<br/>" + selection.short_desc + "</p>";

		} else if(vbid[1] == "spell") {

		} else { // clicked on a pc
			selection = get_pc(vbid[1], vbid[2]);
			modal_title.innerHTML = selection.name;
			modal_body.innerHTML = "<p>"
      + "<span class=\"stat_label\"> Name: </div>" + selection.name + "<br/>"
      + "<span class=\"stat_label\"> Class: </div>" + db.rule.class[selection.class].name+ "<br/>"
      + "<span class=\"stat_label\"> Race: </div>" + db.rule.race[selection.race].name+ "<br/>"
      + "<span class=\"stat_label\"> Level: </div>" + selection.level + "<br/>"
      + "<span class=\"stat_label\"> CON: </div>" + selection.scores[0] + "<br/>"
      + "<span class=\"stat_label\"> STR: </div>" + selection.scores[1] + "<br/>"
      + "<span class=\"stat_label\"> DEX: </div>" + selection.scores[2] + "<br/>"
      + "<span class=\"stat_label\"> WIS: </div>" + selection.scores[3] + "<br/>"
      + "<span class=\"stat_label\"> INT: </div>" + selection.scores[4] + "<br/>"
      + "<span class=\"stat_label\"> CHA: </div>" + selection.scores[5] + "<br/>";


      //only doing skills for now, maybe do the same for spells and etc
      modal_body.innerHTML +=  "<div class=\"stat_label\"> Skills </div>";
      for(let i=0;i<selection.skills.length;i++){
        modal_body.innerHTML += db.rule.skill[selection.skills[i]].name + "<br/>";
      }
      modal_body.innerHTML +=  "<br/>";
      // currently if there are no spells it will be empty with Spells label only
      // probably a good idea to make this not show if there are no spells available
      //if()
      modal_body.innerHTML +=  "<div class=\"stat_label\"> Spells </div>";
      for(let i=0;i<selection.spells.length;i++){
        modal_body.innerHTML += db.rule.spell[selection.spell[i]].name + "<br/>";
      }
      modal_body.innerHTML +=  "<br/>";
       //need to know specifically which feats to asign and output and what to do when there are none
       // if()
      modal_body.innerHTML +=  "<div class=\"stat_label\"> Feats </div>";
      for(let i=0;i<selection.feats.length;i++){
        modal_body.innerHTML += db.rule.class_feats[selection.feats[i]].name + "<br/>";
      }

      modal_body.innerHTML +=  "</p>";
		}
		//console.log("modal appears");
	}
}
// (x) span to close
span.onclick = function() {
  modal.style.display = "none";
  //console.log("modal disappears");
}

//click out of modal closes it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    //console.log("modal disappears");
  }
}

//Temporary Current Character stats

var current_character = {
  class: 0,
  feats: 0,
  level: 0,
  name: 0,
  public: 0,
  race: 0,
  scores: 0,
  skills: 0,
  spell: 0,
  uid: 0
};
//changes class when clicked
function change_class(){
  current_character.class = document.querySelector('input[name="Class_Selection"]:checked').value;
  console.log((current_character.class));
}
//change race
function change_race(){
  current_character.race = document.querySelector('input[name="Race_Selection"]:checked').value;
  console.log((current_character.race));
}
function character_create(){
  current_character.name = document.getElementById('Character_name').value;
  current_character.level = document.getElementById('level_textbox').value;
  var stat = new Array;
  stat[0] = document.getElementById('con_textbox').value;
  stat[1] = document.getElementById('str_textbox').value;
  stat[2] = document.getElementById('dex_textbox').value;
  stat[3] = document.getElementById('wis_textbox').value;
  stat[4] = document.getElementById('int_textbox').value;
  stat[5] = document.getElementById('cha_textbox').value;
  //stat[6] = 0;
  current_character.scores = stat;
  console.log((current_character.name));
  console.log((current_character.level));
  console.log((current_character.scores));
  console.log((current_character));
}

function character_finalize() {
	var pc = current_character
	if(get_pc(uid, pc.name) == "NOT FOUND")
		push_pc(pc.name, pc.scores, pc.class, pc.race, pc.level, pc.feats, [0], pc.spell, uid, pc.public);
	else alert("You already have a character of that name.");
	//function push_pc(name, scores, pclass, race, level, feats, skills, spells, uid, publicity) {
}

//Classes

/*
//Fighter
var myclass = db.rule.class[0];
var myname = document.getElementById("Class_Fighter");
myname.textContent = myclass.name;

myname = document.getElementById("Fighter_Desc");
myname.textContent = myclass.short_desc;

//Druid
myclass = db.rule.class[1];
myname = document.getElementById("Class_Druid");
myname.textContent = myclass.name;

myname = document.getElementById("Druid_Desc");
myname.textContent = myclass.short_desc;

//Wizard
myclass = db.rule.class[2];
myname = document.getElementById("Class_Wizard");
myname.textContent = myclass.name;

myname = document.getElementById("Wizard_Desc");
myname.textContent = myclass.short_desc;
*/


//Races
/*
//Human
var myrace = db.rule.race[0];
var name_of_race = document.getElementById("Race_Human");
name_of_race.textContent = myrace.name;

name_of_race = document.getElementById("Human_Desc");
name_of_race.textContent = myrace.size; //Should be a description, using size for now

//Elf
myrace = db.rule.race[1];
name_of_race = document.getElementById("Race_Elf");
name_of_race.textContent = myrace.name;

name_of_race = document.getElementById("Elf_Desc");
name_of_race.textContent = myrace.size; //Should be a description, using size for now

//Dwarf
myrace = db.rule.race[2];
name_of_race = document.getElementById("Race_Dwarf");
name_of_race.textContent = myrace.name;

name_of_race = document.getElementById("Dwarf_Desc");
name_of_race.textContent = myrace.size; //Should be a description, using size for now
*/

//Spells (Hardcoded for now, probably want to make this dynamic)

//Spell 1

var myspell = db.rule.spell[0];
var name_of_spell = document.getElementById("Spell1_List1");
name_of_spell.textContent = myspell.name;

name_of_spell = document.getElementById("Spell1_List2");
name_of_spell.textContent = myspell.name;

name_of_spell = document.getElementById("Spell1_List3");
name_of_spell.textContent = myspell.name;

//Spell 2
myspell = db.rule.spell[1];
name_of_spell = document.getElementById("Spell2_List1");
name_of_spell.textContent = myspell.name;

name_of_spell = document.getElementById("Spell2_List2");
name_of_spell.textContent = myspell.name;

name_of_spell = document.getElementById("Spell2_List3");
name_of_spell.textContent = myspell.name;

uid = sessionStorage.getItem("uid");
un = get_username(uid);

if(un == "NOT FOUND" && uid.length > 6 && uid.length < 14)
	document.getElementById("welcome").innerHTML = '<div> <p><span id="welcome">You are not logged in.</span> &nbsp ( <a style="color:blue" href = "../index.html">Sign In</a> )</p> If you just created a new account, it may take a minute to process. Thank you for your patience</div>';
else if(un == "NOT FOUND")
	document.getElementById("welcome").innerHTML = '<div> <p><span id="welcome">You are not logged in.</span> &nbsp ( <a style="color:blue" href = "../index.html">Sign In</a> )</p></div>';
else
	document.getElementById("welcome").innerHTML = '<div> <p><span id="welcome">Welcome ' + un + '</span> &nbsp ( <a style="color:blue" href = "../index.html">Sign Out</a> )</p></div>';
