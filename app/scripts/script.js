define(['backbone','marionette'],
    function(Backbone, Marionette) {

        var app = new Backbone.Marionette.Application();

        var Controller = Backbone.Router.extend({
            routes: {
                "chart/:id": "showChart",
                "": "showChartsCollection",
                "story": "story"
            },
            showChart: function (e) {
                $("#block").empty();
                $(".menu").css('display', 'none');
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

        if (Backbone.history && Backbone.history.getFragment()!=='story') {
            app.controller.navigate("", true);
        } else {
            $('.undln').removeClass('undln');
            $('.show-story').addClass('undln');
            app.controller.navigate("story", true);
        }

        require(["controller"], function () {});

        return app;
    });