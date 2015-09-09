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
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        highcharts: '../bower_components/highcharts-release/highcharts'
    }
});

require([
    'backbone', 'marionette',
    'highcharts'
], function (Backbone, Marionette) {
    Backbone.history.start();

    var graphList = new Backbone.Collection(collectionJSON);

    var GraphThumbnail = Marionette.ItemView.extend({
        template: _.template($('.class').html()),
        triggers: {
            "click .graph-top-layer": 'show:graph'
        },
        initialize: function(){
        },
        onRender: function () {
            var $that = this;
            this.model.set('tooltip',false);
            if(this.model.get('long')){
                this.$('.thumbnail-wrapper').addClass('thumbnail-wrapper-long');
                this.$('.graph-top-layer').addClass('graph-top-layer-long');
            }
            function q(){
                $that.$('.thumbnail-graph-wrapper').highcharts($that.model.attributes);
            }
            setTimeout(q, 500);
        }
    });

    var GraphsCollectionView =Marionette.CollectionView.extend({
        childView: GraphThumbnail,
        onChildviewShowGraph: function(childModel) {
            controller.navigate("chart/"+childModel.model.get('id'), true);
            this.trigger('Confirmed', childModel);
        }
    });

    var GraphFullView = Marionette.ItemView.extend({
        template: _.template($('.graph-full').html()),
        events: {
            "click .back-btn": "back",
            "click .chart-action-btn": "chartAction"
        },
        back: function(){
            controller.navigate("", true);
        },
        chartAction: function(){
            console.log(this.model.attributes);
            this.model.set('title', {text:'BlahBlah'});
        },
        modelEvents: {
            "change": "modelChanged"
        },
        modelChanged: function () {
            var $that = this;
            function q(){
                $that.$('.graph-full-wrapper').highcharts($that.model.attributes);
            }
            setTimeout(q, 500);
        },
        onRender: function () {
            var $that = this;
            function q(){
                $that.$('.graph-full-wrapper').highcharts($that.model.attributes);
            }
            setTimeout(q, 500);
        }
    });

    var graphsCollectionViewRender = new GraphsCollectionView({
        collection:graphList
    });

    graphsCollectionViewRender.on('Confirmed', function(options){
        var graphFullView = new GraphFullView({
            model: options.model
        });
        $("#block").append(graphFullView.render().el);
    });

    $("#block").append(graphsCollectionViewRender.render().el);

    console.log(graphList);

    var Controller = Backbone.Router.extend({
        routes: {
            "chart/:id": "showChart",
            "": "showChartsCollection",
            "!/success": "success",
            "!/error": "error"
        },

        showChart: function () {
            $("#block").empty();
        },
        showChartsCollection: function () {
            $("#block").empty();
            $("#block").append(graphsCollectionViewRender.render().el);
        }
    });

    var controller = new Controller();

});
