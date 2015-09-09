define(['app'],
    function (app) {
        app.module("Show.View", function (View, app, Backbone, Marionette) {

            View.ChartsCollection = Backbone.Collection.extend({
                url: function () {
                    return 'url/to/charts/collection';
                },
                initialize: function (model, options) {
                    if (options) {
                        this.options = options;
                    }
                }

            });

            View.GraphThumbnail = Marionette.ItemView.extend({
                template: _.template($('.thumbnail').html()),
                triggers: {
                    "click .graph-top-layer": 'show:graph'
                },
                initialize: function () {
                },
                onRender: function () {
                    var $that = this;
                    if (this.model.get('long')) {
                        this.$('.thumbnail-wrapper').addClass('thumbnail-wrapper-long');
                        this.$('.graph-top-layer').addClass('graph-top-layer-long');
                    }
                    function q() {
                        $that.$('.thumbnail-graph-wrapper').highcharts($that.model.attributes);
                    }

                    setTimeout(q, 500);
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
                    var $that = this;
                    function q() {
                        $that.$('.graph-full-wrapper').highcharts($that.model.attributes);
                    }
                    setTimeout(q, 500);
                },
                onRender: function () {
                    var $that = this;
                    function q() {
                        $that.$('.graph-full-wrapper').highcharts($that.model.attributes);
                    }
                    setTimeout(q, 500);
                }
            });
        });

        return app.Show.View
    });