var attack_mode = true;
var kite_mode = true;
var reset = { // Coordinates to reset to when out of bounds
    x: 490,
	y: 1080,
	square_area: 500 // Stay within an area around x,y of size
}

setInterval(function(){
	log("__________________________________________"); //Easier debugging 'per interval'
    log("Character position: " + Math.round(character.x) + ", " + Math.round(character.y));
	use_pots();
	loot();
	// set_attack_mode();

	if(!attack_mode || character.rip || is_moving(character)) return;

	// stay_in_bounds();
	if(is_out_of_bounds() && attack_mode == true) {
        log("hit");
		attack_mode = false;
		move(reset.x, reset.y).then(function(){
            log("hit2");
		    // change_target(target);
			attack_mode=true;
        });
		return;
	}

	var target=get_targeted_monster();
	if(!target) {
		// TODO only select monstor that is not in combat already?
		target=get_nearest_monster({min_xp:100,max_att:120});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}

	if(can_attack(target)) {
        set_message("Attacking");
		use_best_attack(target);
    }
	// Kite the target
	if(kite_mode) {
		kite(target);
	}

},1000/4); // Loops every 1/4 seconds.

// TODO:
// Status report function (total num kills, deaths, exp etc since code started running)
//  Maybe make this also save to file for totals? Or for sake of not accidentally losing data on crashes etc.

