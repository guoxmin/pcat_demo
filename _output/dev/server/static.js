'use strict';

var express = require('express'),
    app = require('./index');

module.exports = function (dir) {
    dir = dir || '/static';
    return express.static(app.get('root') + dir, {
        maxAge: app.get('env') === 'production' ? Infinity : 0
    });
};