// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

// Custom load code from local file system
function load_local_file(fileName) {
    const fs = require('fs')
    const data = fs.readFileSync("D:/git/AdventurelandCharCode/" + fileName + ".js", 'utf8')
    var library=document.createElement("script");
	library.type="text/javascript";
	library.text=data;
	document.getElementsByTagName("head")[0].appendChild(library);
}
load_local_file("main");
load_local_file("functions");
load_local_file("events");

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
