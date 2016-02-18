var meta = require('./package.json');

var path = require("path");

fis.set('namespace', meta.name);

fis.set("PCAT", {});

fis.set("PCAT.project", meta.name);
fis.set("PCAT.version", meta.version);


fis.set('project', meta.name);
fis.set('version', meta.version);

// 设置输出路径
var outputPath = path.resolve(fis.project.getProjectPath(),"../../_output");
var tagName = "widget"



fis.match('*', {
    release: false
});

fis.media('qa').match("/widget/**/(*.js)", {
    useHash: true,
    release: "${project}/${version}/j/$1",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/'
    })
})

.match("/widget/**/(*.css)", {
    useHash: true,
    release: "${project}/${version}/c/$1",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/'
    })
})


.match(/^\/widget\/(.*\/)*([^\/]+\.(?:png|jpg|gif)$)/i, {
    useHash: true,
    release: "${project}/${version}/i/$2",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/'
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
            to: outputPath + '/qa/template/'
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
            to: outputPath + '/qa/template/'
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
        to: outputPath + '/qa/map/'
    })
})
