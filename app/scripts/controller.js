define(['app','view'],
    function(app, View) {

        var graphList = new Backbone.Collection(collectionJSON);

        if(View){
            var seriesCollection = new View.ChartsCollection;

            /*seriesCollection.fetch({
                success: function (collection, response) {
                     var graphsCollectionViewRender = new View.GraphsCollectionView({
                        collection:collection
                     });
                },
                error: function(){
                }
            });*/

            var graphsCollectionViewRender = new View.GraphsCollectionView({
                collection:graphList
            });
            $("#block").append(graphsCollectionViewRender.render().el);

            graphsCollectionViewRender.on('Confirmed', function(options){
                var title = options.model.get('title').text;
                app.controller.navigate("chart/" + title, true);
                var graphFullView = new View.GraphFullView({
                    model: options.model
                });
                $("#block").append(graphFullView.render().el);
            });

            $('.show-charts').on('click', function(){
                $('.undln').removeClass('undln');
                $(this).addClass('undln');
                app.controller.navigate("", true);
            });
            $('.show-story').on('click', function(){
                $('.undln').removeClass('undln');
                $(this).addClass('undln');
                app.controller.navigate("story", true);
            });

        }
        app.controller.on('show:collection', function(){
            $("#block").append(graphsCollectionViewRender.render().el);
        });

    });