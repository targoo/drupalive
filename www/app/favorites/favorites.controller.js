(function () {
    'use strict';

    angular
        .module('app.favorites')
        .controller('FavoritesController', FavoritesController);

    FavoritesController.$inject = ['$scope', '$q', 'FavoritesService', 'logger'];

    function FavoritesController($scope, $q , FavoritesService, logger) {

        $scope.feeds = [];

        activate();
        ////////////////////////////////////////////////////////////////////////




        function activate() {
            console.log('favorites');
            FavoritesService.getFavoriteFeeds().then(function(response) {
                $scope.feeds = response;
            });
        }

    }

})();
