function LoadScriptsSync (_scripts, scripts) {

    var x = 0;
    var loopArray = function(_scripts, scripts) {
        // call itself
        loadScript(_scripts[x], scripts[x], function(){
            // set x to next item
            x++;
            // any more items in array?
            if(x < _scripts.length) {
                loopArray(_scripts, scripts);
            }
        });
    }
    loopArray(_scripts, scripts);
}

var scripts = [];
var _scripts = ['firebase.js', 'main.js'];
LoadScriptsSync(_scripts, scripts);
