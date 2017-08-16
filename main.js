'use strict';

let type = function(strings, cb) {
    let scroll = function() {
        var elem = document.getElementById('content');
        elem.scrollTop = elem.scrollHeight;
    };
    
    if(!strings.length) {
        if (cb) cb();
        scroll();
        return;
    }

    if(!strings[0].length) {
        $("<pre><br/></pre>").appendTo($("#content"))
        type(strings.slice(1),cb);
        scroll();    
        return;
    }
    
    var el = $("<pre></pre>").appendTo($("#content"));
    scroll();
    el.typeIt({
        speed:10,
        startDelay:0,
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
    $("#content pre:last-child").remove()
    let el = document.getElementById(id);
    let html = document.getElementById(id).innerHTML;
    
    let strings = html.split("\n");
    type(
        strings.concat([$('#menu')[0].innerHTML]),
        function() {
            $("<pre></pre>").appendTo($("#content")).typeIt({
                cursor: true,
                html:false,
                startDelay:0,
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
