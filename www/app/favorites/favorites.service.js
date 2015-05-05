(function () {
    'use strict';

    angular
        .module('app.favorites')
        .factory('FavoritesService', FavoritesService);

    FavoritesService.$inject = ['$q', 'Feeds', 'localstorage', 'logger'];

    function FavoritesService($q, Feeds, localstorage, logger) {

        var service = {
            favorites: localstorage.get('favorites', []),
            favoriteFeeds: [],
            addFavorite: addFavorite,
            removeFavorite: removeFavorite,
            getFavoriteFeeds: getFavoriteFeeds,
            isFavorite: isFavorite
        }

        return service;

        ////////////////////////////////////////////////////////////////////////




        function getFavoriteFeeds () {
            return Feeds.load(false, false).then(
                function (response) {
                    logger.success('Feeds loaded');
                    return _.filter(response, function(o){
                        return _.contains(service.favorites, o.nid);
                    });
                },
                function (error) {
                    logger.error('Something wrong happen');
                });
        };

        function isFavorite (item) {
            return _.contains(service.favorites, item);
        };

        function addFavorite (item) {
            service.favorites.push(item);
            localstorage.set(service.favorites)
            console.log(service.favorites);
        };

        function removeFavorite (item) {
            service.favorites.splice(service.favorites.indexOf(item), 1)
            localstorage.set(service.favorites)
            console.log(service.favorites);
        };
    }

})();
