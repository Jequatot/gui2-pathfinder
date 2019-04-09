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

//changes class when clicked
// for some reason the first selection's value says on
function change_class()
{
    player_class = document.querySelector('input[name="Class_Selection"]:checked').value;
  console.log((player_class));
}
//change race
function change_race()
{
  player_race = document.querySelector('input[name="Race_Selection"]:checked').value;
console.log((player_race));
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
	"<button type='button' id = 'view_button'>View</button><button type='button' disabled>Edit</button><button type='button' disabled>Delete</button>";


	pcrow.appendChild(nodename);
	pcrow.appendChild(nodeclass);
	pcrow.appendChild(noderace);
	pcrow.appendChild(nodelevel);
	pcrow.appendChild(nodeowner);
	pcrow.appendChild(nodeperm);
	pcrow.appendChild(nodebutton);
	pctab.appendChild(pcrow);
}
// view button to see modal to pop out
  var btn = document.getElementById('view_button');
  var modal =  document.getElementById('modal_popout');
  var span = document.getElementsByClassName("close")[0];
// button clicked
  btn.onclick = function() {
  modal.style.display = "block";
  console.log("modal appears");
}
// (x) span to close
span.onclick = function() {
  modal.style.display = "none";
  console.log("modal disappears");
}

//click out of modal closes it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    console.log("modal disappears");
  }
}
//Classes

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



//Races

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
