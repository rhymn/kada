'use strict';

let type = function(strings, cb) {
    if(!strings.length) {
        if (cb) cb();
        return;
    }
    if(!strings[0].length) {
        $("<pre><br/></pre>").appendTo($("#content"))
        type(strings.slice(1),cb);
        return;
    }
    var el = $("<pre></pre>").appendTo($("#content"));
    var elem = document.getElementById('window');
    elem.scrollTop = elem.scrollHeight;

    el.typeIt({
        speed:10,
        startDelay:50,
        html:true,
        cursor: false,
        callback: function() {
            type(strings.slice(1), cb)
            el.find("a").click(function(){
                typeElement(
                    $(this).attr('content')
                );
            })
        }
    }).tiType(strings[0].trim());
}


let typeElement = function(id) {
    let el = document.getElementById(id);
    let html = document.getElementById(id).innerHTML;
    
    let strings = html.split("\n");
    type(
        strings.concat([$('#menu')[0].innerHTML]),
        function() {
            $("<pre></pre>").appendTo($("#content")).typeIt({
                cursor: true,
                html:false,
                strings: ['>']
            });
        }
    );
    let img = el.getAttribute('bgimg');
    if(img) {
        $("body").css('background-image','url("' + img + '")')
    }
    
}

typeElement('head');
