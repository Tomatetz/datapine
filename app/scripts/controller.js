define(['app','view'],
    function(app, View) {

        var chartsCollectionList = new Backbone.Collection(collectionJSON);

            /*
            var seriesCollection = new View.ChartsCollection;

            seriesCollection.fetch({
                success: function (collection, response) {
                     var graphsCollectionViewRender = new View.GraphsCollectionView({
                        collection:collection
                     });
                },
                error: function(){
                }
            });
            */

        var chartsCollectionViewRender = new View.ChartsCollectionView({
            collection:chartsCollectionList
        });
        $("#block").append(chartsCollectionViewRender.render().el);

        chartsCollectionViewRender.on('show:fullsize', function(options){
            var title = options.model.get('title').text;
            app.controller.navigate("chart/" + title, true);

            var graphFullView = new View.ChartFullView({
                model: options.model
            });
            $("#block").append(graphFullView.render().el);
        });

        $('.menu-item').on('click', function(){
            $('.undln').removeClass('undln');
            $(this).addClass('undln');
            app.controller.navigate($(this).data('navigateTo'), true);
        });
        app.controller.on('show:collection', function(){
            $("#block").append(chartsCollectionViewRender.render().el);
        });
    });