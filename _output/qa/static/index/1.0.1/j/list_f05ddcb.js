require.config({
    deps : {
        'page.js' : [ 'a.js', 'b.js' ],
        'a.js'    : [ 'c.js' ],
        'b.js'    : [ 'd.js', 'e.js' ],
        'c.js'    : [ 'f.js' ],
        'd.js'    : [ 'f.js' ],
        "dialog":['1.js','1.css'],
        'page2.js' : [ 'a.js', 'b.js' ],
        'a.js'    : [ 'c.js' ],
        'b.js'    : [ 'd.js', 'e.js' ],
        'c.js'    : [ 'f.js' ],
        'd.js'    : [ 'f.js' ],
        "dialog":['1.js','1.css']
    }
});



require.config({
    deps : {
      
        "dialog":['1.js','1.css']
        '
});



http://www.example.com/f.js,c.js,d.js,e.js,a.js,b.js,page.js


