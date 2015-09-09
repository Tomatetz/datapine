define(['app'],
    function (app) {
        app.module("Show.View", function (View, app, Backbone, Marionette) {

            /*
            View.ChartsCollection = Backbone.Collection.extend({
                url: function () {
                    return '/url/to/charts/collection';
                },
                initialize: function (model, options) {
                    if (options) {
                        this.options = options;
                    }
                }

            });
            */

            function makeChart(holder){
                var $that = this;
                function q() {
                    $that.$(holder).highcharts($that.model.attributes);
                }
                setTimeout(q, 100);
            }

            View.GraphThumbnail = Marionette.ItemView.extend({
                template: _.template($('.thumbnail').html()),
                triggers: {
                    "click .graph-top-layer": 'show:graph'
                },
                onRender: function () {
                    if (this.model.get('long')) {
                        this.$('.thumbnail-wrapper').addClass('thumbnail-wrapper-long');
                        this.$('.graph-top-layer').addClass('graph-top-layer-long');
                    }
                    makeChart.call(this, '.thumbnail-graph-wrapper');
                }
            });

            View.GraphsCollectionView = Marionette.CollectionView.extend({
                childView: View.GraphThumbnail,
                onChildviewShowGraph: function (childModel) {
                    this.trigger('Confirmed', childModel);
                }
            });

            View.GraphFullView = Marionette.ItemView.extend({
                template: _.template($('.chart-fullsize').html()),
                events: {
                    "click .back-btn": "back",
                    "click .chart-action-btn": "chartAction",
                    "click .apply-chart-rename-btn": "chartRenameAction",
                    "click .cancel-chart-rename-btn": "cancelChartRenameAction"
                },
                modelEvents: {
                    "change": "modelChanged"
                },
                back: function () {
                    app.controller.navigate("", true);
                },
                chartAction: function () {
                    this.$el.find('.new-chart-name').css('display', 'block');
                    this.$el.find('#chart-name').focus();
                    this.$el.find('.chart-btns').css('display', 'none');
                },
                chartRenameAction: function () {
                    var newName = this.$el.find('#chart-name').val();
                    if (newName) {
                        this.model.set('title', {text: newName});
                        this.cancelChartRenameAction();
                        app.controller.navigate("chart/" + newName, false);
                    }
                },
                cancelChartRenameAction: function () {
                    this.$el.find('.new-chart-name').css('display', 'none');
                    this.$el.find('.chart-btns').css('display', 'block');
                },
                modelChanged: function () {
                    makeChart.call(this, '.chart-full-wrapper');
                },
                onRender: function () {
                    makeChart.call(this, '.chart-full-wrapper');
                }
            });
        });

        return app.Show.View
    });