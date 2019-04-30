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

//user id
uid = sessionStorage.getItem("uid");

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
	if(db.pc[i].public == 1 || db.pc[i].uid == uid) {
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

		var deletebuttoncontent = "disabled";
		if(uid == db.pc[i].uid)
			deletebuttoncontent = "onclick='character_delete(\"" + uid + "\", \"" + db.pc[i].name + "\")'"
		nodebutton.innerHTML =
		"<button type='button' class =\"view_button\" id=\"vb_" + db.pc[i].uid + "_" + db.pc[i].name + "\">View</button><button type='button' disabled>Edit</button><button type='button' " + deletebuttoncontent + ">Delete</button>";


		pcrow.appendChild(nodename);
		pcrow.appendChild(nodeclass);
		pcrow.appendChild(noderace);
		pcrow.appendChild(nodelevel);
		pcrow.appendChild(nodeowner);
		pcrow.appendChild(nodeperm);
		pcrow.appendChild(nodebutton);
		pctab.appendChild(pcrow);
	}
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

function assign_modal() {
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
  			selection = db.rule.spell[get_spell(vbid[2])];
  			modal_title.innerHTML = selection.name;
  			modal_body.innerHTML = "<p>" + selection.name + "<br/>" + selection.long_desc + "</p>";

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
        for(let j=0;j<selection.skills.length;j++){
          modal_body.innerHTML += db.rule.skill[selection.skills[j]].name + "<br/>";
        }
        modal_body.innerHTML +=  "<br/>";
        // currently if there are no spells it will be empty with Spells label only
        // probably a good idea to make this not show if there are no spells available
        //if()
        try {
          modal_body.innerHTML +=  "<div class=\"stat_label\"> Spells </div>";
          for(let j=0;j<selection.spells.length;j++){
            modal_body.innerHTML += db.rule.spell[selection.spells[j]].name + "<br/>";
          }
          modal_body.innerHTML +=  "<br/>";
        } catch(error) {}
         //need to know specifically which feats to asign and output and what to do when there are none
         // if()
        try {
          modal_body.innerHTML +=  "<div class=\"stat_label\"> Feats </div>";
          for(let i=0;i<selection.feats.length;j++){
            modal_body.innerHTML += db.rule.class_feats[selection.feats[j]].name + "<br/>";
          }
        } catch(error) {}

        modal_body.innerHTML +=  "</p>";
  		}
  		//console.log("modal appears");
  	}
  }
}

assign_modal()

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
  spell: [],
  uid: 0
};
//changes class when clicked
function change_class(){
  current_character.class = document.querySelector('input[name="Class_Selection"]:checked').value;
  //console.log((current_character.class));
  populate_spells();
}
//change race
function change_race(){
  current_character.race = document.querySelector('input[name="Race_Selection"]:checked').value;
  //console.log((current_character.race));
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
  current_character.public = document.getElementById('public_box').checked ? 1 : 0;
  //console.log((current_character.name));
  //console.log((current_character.level));
  //console.log((current_character.scores));
  //console.log((current_character));


  populate_spells();
  alert("Character information saved");
  update_final_page();
}

function update_final_page() {
  final_page = getElementById("#final_stat");
alert("character transfered to finalize");
  final_page.innerHTML = "<p>"
  + "<span class=\"stat_label\"> Name: </div>" + current_character.name + "<br/>"
  + "<span class=\"stat_label\"> Class: </div>" + current_character.class + "<br/>"
  + "<span class=\"stat_label\"> Race: </div>" +  current_character.race + "<br/>"
  + "<span class=\"stat_label\"> Level: </div>" +  current_character.level + "<br/>"
  + "<span class=\"stat_label\"> CON: </div>" +  current_character.scores[0] + "<br/>"
  + "<span class=\"stat_label\"> STR: </div>" +  current_character.scores[1] + "<br/>"
  + "<span class=\"stat_label\"> DEX: </div>" +  current_character.scores[2] + "<br/>"
  + "<span class=\"stat_label\"> WIS: </div>" +  current_character.scores[3] + "<br/>"
  + "<span class=\"stat_label\"> INT: </div>" +  current_character.scores[4] + "<br/>"
  + "<span class=\"stat_label\"> CHA: </div>" +  current_character.scores[5] + "<br/>";

  final_page.innerHTML +=  "<div class=\"stat_label\"> Skills </div>";
  for(let j=0;j<current_character.skills.length;j++){
    final_page.innerHTML += db.rule.skill[current_character.skills[j]].name + "<br/>";
  }
  final_page.innerHTML +=  "<br/>";
  // currently if there are no spells it will be empty with Spells label only
  // probably a good idea to make this not show if there are no spells available
  //if()
  try {
    final_page.innerHTML +=  "<div class=\"stat_label\"> Spells </div>";
    for(let j=0;j<current_character.spells.length;j++){
      final_page.innerHTML += db.rule.spell[current_character.spells[j]].name + "<br/>";
    }
    final_page.innerHTML +=  "<br/>";
  } catch(error) {}
   //need to know specifically which feats to asign and output and what to do when there are none
   // if()
  try {
    final_page.innerHTML +=  "<div class=\"stat_label\"> Feats </div>";
    for(let i=0;i<current_character.feats.length;j++){
      final_page.innerHTML += db.rule.class_feats[current_character.feats[j]].name + "<br/>";
    }
  } catch(error) {}

  final_page.innerHTML +=  "</p>";
}

function character_finalize() {
	var pc = current_character
	if(get_pc(uid, pc.name) == "NOT FOUND")
		push_pc(pc.name, pc.scores, pc.class, pc.race, pc.level, pc.feats, [0], pc.spell, uid, pc.public);
	else alert("You already have a character of that name.");
  alert("Character succesfully created!");
	//function push_pc(name, scores, pclass, race, level, feats, skills, spells, uid, publicity) {
}

function character_delete(_uid, _name) {
	if(confirm("Delete your character, " + _name + "?\nThis cannot be undone.")) {
		delete_pc(_uid, _name);
	}
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

/*
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
*/
function spelldisplay(lv) {
  for(i = 0; i < 10; i++) {
    if(i == lv)
      document.getElementById("spellchart-lv" + i).style.display = "block";
    else
      document.getElementById("spellchart-lv" + i).style.display = "none";
  }
}

var spellchartformat = "<tr><th>Name</th><th></th><th></th></tr>";
spellsbg = document.getElementById("spells_bg");
spellsbg.innerHTML += "<table id='spellchart-lv0' class='spellchart' style='display:none;max-height:50vh'>" + spellchartformat + "</table>";
for(i = 0; i < 10; i++) {
  spellsbg.innerHTML += "<table id='spellchart-lv" + i + "' class='spellchart' style='display:none;max-height:50vh'>" + spellchartformat + "</table>";
}

//triggers when class or level is changed
function populate_spells() {
  var noncasters = ["0", "4", "5", "8"];
  if(noncasters.includes(current_character.class)) {
    document.getElementById("spellerror").innerHTML = "Your selected class is not a spellcaster.";
    return;
  }
  try{
    max_spell_level = db.rule.class[current_character.class].level_bonus[current_character.level - 1].spellcount.length;
  } catch(error) {
    document.getElementById("spellerror").innerHTML = "Make sure you select a valid level first in the stats tab.<br>If your level is valid (between 1-20) spell selection may not yet be implemented for your class at this level. Sorry!";
    return;
  }
  document.getElementById("spellerror").innerHTML = "";
  var spellsbg = document.getElementById("spell_level_buttons");
  spellsbg.innerHTML = "";
  for(i = 0; i < 10; i++) {
    spellsbg.innerHTML += "<button onclick='spelldisplay(" + i + ")'" + (i > max_spell_level - 1 ? "disabled" : "") + ">" + i + "</button>";
  }
  for(i = 0; i < max_spell_level; i++) {
      document.getElementById("spellchart-lv" + i).innerHTML = spellchartformat;
      console.log(i);
      document.getElementById("preparedspelllabel_lv" + i).innerHTML = "<tr><td>Level " + i + "</td><td></td><td id='preparedspelllabeluses_lv" + i + "''>0/" + db.rule.class[current_character.class].level_bonus[current_character.level - 1].spellcount[i] + "</td></tr>";
  }
  for(i = 0; i < db.rule.spell.length; i++) {
    lv = db.rule.spell[i].level[current_character.class];
    if(lv >= 0)
      document.getElementById("spellchart-lv" + lv).innerHTML += "<tr><td>" + db.rule.spell[i].name + "</td>" +
  		"<td><button type='button' class =\"view_button\" id=\"vb_spell_" + db.rule.spell[i].name + "\">Details</button></td>" +
  		"<td><button type='button' class =\"add_button\" onclick='prepare_spell(\"" + db.rule.spell[i].name + "\", " + lv + ")'>Prepare</button></td></tr>";
  }
  assign_modal();
}

var totalspellcount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function prepare_spell(name, lv) {
  current_character.spell.push(get_spell(name));
  try {
    document.getElementById("preparedspelluses_" + name).value++;
    update_spellcount(lv, 1);
    return;
  }
  catch(error){
    var button =
    "<button type='button' class =\"view_button\" id=\"vb_spell_" + name + "\">Details</button>";
    var uses = 1;

    //Create divs for each entry
    var name_entry = "<td class=\"name_box\">"+name+"</td>";
    var view_button = "<td class=\"name_box\">"+button+"</td>";
    var uses = "<td class=\"name_box\"><input id='preparedspelluses_" + name + "' type='text' value=" + uses + "></input></td>";
    var remove_button = "<td class='name_box'><button onclick='unprepare_spell(\"" + name + "\", \"" + lv + "\")'>X</button></td>";

    //Add the entries to the chart
    document.getElementById("preparedspelllabel_lv" + lv).innerHTML += "<tr id='preparedspell_" + name + "'>" + name_entry + view_button + uses + remove_button + "</tr>";
    update_spellcount(lv, 1);
    assign_modal();
  }
}

function unprepare_spell(name, lv) {
  current_character.spell.splice(current_character.spell.index(get_spell(name)))

  n = document.getElementById("preparedspell_" + name);
  update_spellcount(lv, document.getElementById("preparedspelluses_" + name).value * -1);
  n.parentNode.removeChild(n);
}

function update_spellcount(lv, mod) {
  totalspellcount[lv] += mod;
  total_spells = db.rule.class[current_character.class].level_bonus[current_character.level - 1].spellcount[lv];
  usestext = document.getElementById("preparedspelllabeluses_lv" + lv);
  usestext.innerHTML = totalspellcount[lv] + "/" + total_spells;
  if(totalspellcount[lv] > total_spells)
    usestext.style.color = "red";
  else if(totalspellcount[lv] == total_spells)
    usestext.style.color = "green";
  else usestext.style.color = "black";
}

// login info
un = get_username(uid);

if(un == "NOT FOUND" && uid.length > 6 && uid.length < 14)
	document.getElementById("welcome").innerHTML = '<div> <p><span id="welcome">You are not logged in.</span> &nbsp ( <a style="color:blue" href = "../index.html">Sign In</a> )</p> If you just created a new account, it may take a minute to process. Thank you for your patience</div>';
else if(un == "NOT FOUND")
	document.getElementById("welcome").innerHTML = '<div> <p><span id="welcome">You are not logged in.</span> &nbsp ( <a style="color:blue" href = "../index.html">Sign In</a> )</p></div>';
else
	document.getElementById("welcome").innerHTML = '<div> <p><span id="welcome">Welcome ' + un + '</span> &nbsp ( <a style="color:blue" href = "../index.html">Sign Out</a> )</p></div>';
