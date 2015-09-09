define(['backbone','marionette'],
    function(Backbone, Marionette) {

        var app = new Backbone.Marionette.Application();

        var Controller = Backbone.Router.extend({
            routes: {
                "chart/:id": "showChart",
                "": "showChartsCollection",
                "story": "story"
            },
            showChart: function () {
                $("#block").empty();
                $(".menu").css('display', 'none');
                this.trigger('show:chart');
            },
            showChartsCollection: function () {
                $("#block").empty();
                $(".menu").css('display', 'block');
                $(".hero-unit").css('display', 'none');
                this.trigger('show:collection');

            },
            story: function () {
                $("#block").empty();
                $(".hero-unit").css('display', 'block');
            }
        });

        app.controller = new Controller();

        Backbone.history.stop();
        Backbone.history.start();

        app.controller.navigate("", true);
        if (Backbone.history) {
            require(["controller"], function () {

            });
        }
        return app;
    });