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

// load script function with callback to handle synchronicity
function loadScript( src, script, callback ){

    script = document.createElement('script');
    script.onerror = function() {
        // handling error when loading script
        alert('Error to handle')
    }
    script.onload = function(){
        console.log(src + ' loaded ')
        callback();
    }
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
}


var scripts = [];
var _scripts = ['firebase.js', 'main.js'];
LoadScriptsSync(_scripts, scripts);
