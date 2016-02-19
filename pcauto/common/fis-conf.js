var meta = require('./package.json');

var path = require("path");

fis.set('namespace', meta.name);





fis.set('project', meta.name);
fis.set('version', meta.version);


var tagName = "widget";

// 设置输出路径
var outputPath = path.resolve(fis.project.getProjectPath(),"../../_output");

var media = fis.project.currentMedia() || "dev";

var site = path.resolve(fis.project.getProjectPath(),"../").split(path.sep).reverse()[0];

fis.set("PCAT", {
    project:meta.name,
    version:meta.version,
    media:media,
    site:site,
    tagName:"widget",//约束为与组件目录同名
    mapOutputPath:path.resolve(outputPath,media,"map",site),
    staticOutputPath:path.resolve(outputPath,media,"static",site),
    templateOutputPath:path.resolve(outputPath,media,"template",site)
});

console.log(fis.get("PCAT.mapOutputPath"))
console.log(outputPath + '/qa/map/pcauto/')


fis.match('*', {
    release: false
});

fis.media('qa').match(/^\/widget\/(.*\/)*([^\/]+\.js$)/i, {
    useHash: true,
    release: "${project}/${version}/j/$2",
    deploy: fis.plugin('local-deliver', {
        to: fis.get("PCAT.staticOutputPath")
    })
})

.match(/^\/page\/(.*\/)*([^\/]+\.js$)/i, {
    useHash: true,
    release: "${project}/${version}/j/$2",
    deploy: fis.plugin('local-deliver', {
        to: fis.get("PCAT.staticOutputPath")
    })
})

.match(/^\/widget\/(.*\/)*([^\/]+\.css$)/i, {
    useHash: true,
    release: "${project}/${version}/c/$2",
    deploy: fis.plugin('local-deliver', {
        to: fis.get("PCAT.staticOutputPath")
    })
})

.match(/^\/page\/(.*\/)*([^\/]+\.css$)/i, {
    useHash: true,
    release: "${project}/${version}/c/$2",
    deploy: fis.plugin('local-deliver', {
        to: fis.get("PCAT.staticOutputPath")
    })
})



.match(/^\/widget\/(.*\/)*([^\/]+\.(?:png|jpg|gif)$)/i, {
    useHash: true,
    release: "${project}/${version}/i/$2",
    deploy: fis.plugin('local-deliver', {
        to: fis.get("PCAT.staticOutputPath")
    })
})

.match(/^\/page\/(.*\/)*([^\/]+\.(?:png|jpg|gif)$)/i, {
    useHash: true,
    release: "${project}/${version}/i/$2",
    deploy: fis.plugin('local-deliver', {
        to: fis.get("PCAT.staticOutputPath")
    })
})



.match(/^\/widget\/(.*\/)*([^\/]+\.(?:html|cms|tpl)$)/i, {
        useHash: true,
        isHtmlLike: true,
        isWidget: true,
        useSameNameRequire: true,
        useMap: true,
        release: "${project}/${version}/$2",
        deploy: fis.plugin('local-deliver', {
            to: fis.get("PCAT.templateOutputPath")
        })
    })
    .match(/^\/page\/(.*\/)*([^\/]+\.(?:html|cms|tpl)$)/i, {
        // useHash: true,
        useSameNameRequire: true,
        isPage: true,
        extras: {
            isPage: true
        },
        useMap: true,
        release: "${project}/${version}/$2",
        deploy: fis.plugin('local-deliver', {
            to: fis.get("PCAT.templateOutputPath")
        })
    })




fis.media('qa').match("*.html", {
    parser: fis.plugin("widget-load", {
        tagName: "widget",
        outputPath: outputPath
    })
})

.match("::package",{
    packager:fis.plugin("widget-render",{
        tagName: "widget",
        outputPath:  outputPath
    })
})

.match("*map.json", {
    useHash: false,
    release: "${project}/${version}/$0",
    deploy: fis.plugin('local-deliver', {
        to: fis.get("PCAT.mapOutputPath")
    })
})
