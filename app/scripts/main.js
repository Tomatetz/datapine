/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        marionette: {
            deps: [
                'backbone'
            ],
            exports: 'Marionette'
        },
        highcharts:{
            deps: [
                'jquery'
            ]
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        highcharts: '../bower_components/highcharts-release/highcharts',
        app: './app'
    }
});

require([
    'backbone', 'marionette',
    'highcharts', 'app'
], function (Backbone, Marionette) {
    require(["controller"], function () {});
});
