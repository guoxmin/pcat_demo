var meta = require('./package.json');

var path = require("path");

fis.set('namespace', meta.name);





fis.set('project', meta.name);
fis.set('version', meta.version);

// 设置输出路径
var outputPath = path.resolve(fis.project.getProjectPath(),"../../_output");
var tagName = "widget"


fis.set("PCAT", {
    project:meta.name,
    version:meta.version,
    media:fis.project.currentMedia() || "dev",
    mapPath:outputPath+
});


fis.match('*', {
    release: false
});

fis.media('qa').match(/^\/widget\/(.*\/)*([^\/]+\.js$)/i, {
    useHash: true,
    release: "${project}/${version}/j/$2",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/pcauto/'
    })
})

.match(/^\/page\/(.*\/)*([^\/]+\.js$)/i, {
    useHash: true,
    release: "${project}/${version}/j/$2",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/pcauto/'
    })
})

.match(/^\/widget\/(.*\/)*([^\/]+\.css$)/i, {
    useHash: true,
    release: "${project}/${version}/c/$2",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/pcauto/'
    })
})

.match(/^\/page\/(.*\/)*([^\/]+\.css$)/i, {
    useHash: true,
    release: "${project}/${version}/c/$2",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/pcauto/'
    })
})



.match(/^\/widget\/(.*\/)*([^\/]+\.(?:png|jpg|gif)$)/i, {
    useHash: true,
    release: "${project}/${version}/i/$2",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/pcauto/'
    })
})

.match(/^\/page\/(.*\/)*([^\/]+\.(?:png|jpg|gif)$)/i, {
    useHash: true,
    release: "${project}/${version}/i/$2",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/pcauto/'
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
            to: outputPath + '/qa/template/pcauto/'
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
            to: outputPath + '/qa/template/pcauto/'
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
        to: outputPath + '/qa/map/pcauto/'
    })
})
