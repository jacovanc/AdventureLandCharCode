// Functions
function log(msg, game = false) {
	to_log =  new Date().toLocaleString() + " : " + msg;
	console.log(to_log);
	if(game) {
		game_log(msg, "grey");
	}
}
function use_pots()
{
    var hp_potion_amount = 200;
    if(character.rip) return;
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return;
	var used=false;
	if(new Date()<parent.next_skill.use_hp) return;
	if(character.mp/character.max_mp<0.2) {
		use('use_mp'),used=true; 
	} else if(character.hp < (character.max_hp - hp_potion_amount))  {
		log("Health Potion used! Was " + character.hp + "/" + character.max_hp, true);
		use('use_hp'),used=true; 	
	}
	//else if(character.hp/character.max_hp<0.7) use('use_hp'),used=true;
	//else if(character.mp/character.max_mp<0.8) use('use_mp'),used=true;
	//else if(character.hp<character.max_hp) use('use_hp'),used=true;
	//else if(character.mp<character.max_mp) use('use_mp'),used=true;
	if(used) last_potion=new Date();
}
function set_attack_mode() {
	if(1) { //TODO: any conditions to determine if should attack here?
		attack_mode = true;
	} else {
		attack_mode = false;
	}
}


/* Combat functions */
function use_best_attack(target) {
    var best_attack = get_best_attack(); // TODO: Make this function use the best_attack
    attack(target);
}
function get_best_attack() {
    return "attack"; // TODO: Make this function return the best attack that can be used
}
function kite(target) {
    var character_range = character.range * 0.8; // Not the full range in order to stop bugs when it is right at the edge.
    var diff = { 
        x: character.x - target.x,
        y: character.y - target.y,
    }
    //NEGATIVE diff = left, pos = right
    var x_needed = (character_range - abs(diff.x));
    if(diff.x > 0) {
        x = character.x + x_needed; // Move right
    } else {
        x = character.x - x_needed; // Move left
    }
    var y_needed = (character_range - abs(diff.y));
    if(diff.y > 0) {
        y = character.y + y_needed; // Move right
    } else {
        y = character.y - y_needed; // Move left
    }

    move(
        x,
        y
    )

    kite2(target); //Just to get console.log info while doing old kite
}
function kite2(target) {
    var cr = character.range * 0.8; //character.range;
    var cr2 = Math.pow(cr, 2);
    var dx = abs(character.x - target.x); //The x difference
    var dy = abs(character.y - target.y); // The y difference
    var dx2 = Math.pow(dx, 2);
    var dy2 = Math.pow(dy, 2);
    var d2 = dx2 + dy2;

    var squared_diff = cr2 - d2; // The difference between wanted distance and current distance
    var diff = Math.sqrt(squared_diff);
    console.log(diff);

    // We want d2 to == 100 (cr2), by making up the squared_diff
    console.log("sqr diff: ", squared_diff);
    console.log(d2);
    console.log(cr2);
    var D = Math.sqrt(d2); // Formula to calculate distance between 2 points

    console.log(D);
}