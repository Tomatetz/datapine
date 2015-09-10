define(['backbone','marionette'],
    function(Backbone, Marionette) {

        var app = new Backbone.Marionette.Application();

        var Controller = Backbone.Router.extend({
            routes: {
                "chart/:id": "showChart",
                "": "showChartsCollection",
                "story": "showStory"
            },
            showChart: function () {
                this.emptyBlock('none','none');
            },
            showChartsCollection: function () {
                this.emptyBlock('block','none');
                $(".hero-unit").css('display', 'none');
                this.trigger('show:collection');
            },
            showStory: function () {
                this.emptyBlock('block', 'block');
            },
            emptyBlock: function(showMenu, showStory){
                $("#block").empty();
                $(".hero-unit").css('display', showStory);
                $(".menu").css('display', showMenu);
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

        return app;
    });