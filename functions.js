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

var step_size = 20; 
var char_range = character.range * 1 - step_size; //character.range;
function kite(target) { // TODO: Move this logic out of main loop (4 times a second) to a faster tick loop? May cause problems.
    var _dx = character.x - target.x;
    var _dy = character.y - target.y;
    var dx = abs(_dx); //The x difference
    var dy = abs(_dy); // The y difference
    var x = character.x;
    var y = character.y;

    if(dx < dy) { // Determine y and x movement absolute values (normalised to 1 for the larger value), multiplied by the defined 'step_size' value
        var ymove = (dy / dy) * step_size; // (dy/dy) = 1 (but keeps pos/negative sign)
        var xmove = (dx / dy) * step_size;
    } else {
        var xmove = (dx / dx) * step_size; // (dx/dx) = 1 (but keeps pos/negative sign)
        var ymove = (dy / dx) * step_size;
    }
    log(character.x + " " + character.y);
    var distance = get_distance_between(character, target);
    if(distance < char_range) {
        // log("Kiting: Get further away");
        // Get further away
        if(_dx > 0) {
            x = character.x + xmove; // Move right
        } else {
            x = character.x - xmove; // Move left
        }
        if(_dy > 0) {
            y = character.y + ymove; // Move up
        } else {
            y = character.y - ymove; // Move down
        }
    } else if(distance > char_range + (step_size)) { // If out of range (by more than 1 step sizes)
        // log("Kiting: Get closer");
        // Get closer
        if(_dx > 0) {
            x = character.x - xmove; // Move left
        } else {
            x = character.x + xmove; // Move right
        }
        if(_dy > 0) {
            y = character.y - ymove; // Move down
        } else {
            y = character.y + ymove; // Move up
        }
    } else { // If only just out of range, don't move just wait
        log("Kiting: Don't move just wait");
    }
    move(
        x,
        y
    )

}
function get_distance_between(p1, p2) {
    var dx = abs(p1.x - p2.x); //The x difference
    var dy = abs(p1.y - p2.y); // The y difference
    var dx2 = Math.pow(dx, 2);
    var dy2 = Math.pow(dy, 2);
    var d2 = dx2 + dy2;
    var D = Math.sqrt(d2); // The distance between char and target

    return D;
}

/* Movement automation functions */
function stay_in_bounds() {
    if(is_out_of_bounds()) {
        log("hit");
		attack_mode = false;
		move(reset.x, reset.y).then(function(){
            log("hit2");
		    // change_target(target);
			attack_mode=true;
        });
		return;
	}
}
function is_out_of_bounds() {
    var sides = reset.square_area / 2;
    if(character.x > reset.x + sides 
    || character.x < reset.x - sides 
    || character.y > reset.y + sides
    || character.y < reset.y - sides) {
        log("out");
        return true;
    }
    log("in");
    return false;
}