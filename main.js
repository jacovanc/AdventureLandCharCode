var attack_mode=false;
setInterval(function(){
	use_pots();
	loot();
	set_attack_mode();
	
	if(!attack_mode || character.rip || is_moving(character)) return;

	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:120});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
    if(can_attack(target))
	{
        set_message("Attacking");
		use_best_attack(target);
    } else {
        // Kite the target
        // console.log("char: ", character.x + ", " + character.y);
        // console.log("targ: ", target.x + ", " + target.y);
        // console.log("____");
        kite(target);
    }

},1000/4); // Loops every 1/4 seconds.

// TODO:
// Status report function (total num kills, deaths, exp etc since code started running)
//  Maybe make this also save to file for totals? Or for sake of not accidentally losing data on crashes etc.

