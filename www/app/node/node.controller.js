(function () {
    'use strict';

    angular
        .module('app.node')
        .controller('NodeController', NodeController);

    NodeController.$inject = ['$scope', '$q', '$stateParams', 'Node', 'FavoritesService', 'logger'];

    function NodeController($scope, $q, $stateParams, Node, FavoritesService, logger) {

        $scope.isFavorite = false;
        $scope.manageFavorite = manageFavorite;

        activate();

        ////////////////////////////////////////////////////////////////////////




        function activate() {
            Node.getNode($stateParams.nodeId)
                .then(onResponse)
                .catch(onError)
                .finally();
        }

        function onResponse(response) {
            logger.success('onResponse');
            $scope.node = response;
            $scope.isFavorite = FavoritesService.isFavorite(response.nid);
        }

        function onError(error) {
            logger.error(error);
        }

        function manageFavorite() {
            if ($scope.isFavorite) {
                FavoritesService.removeFavorite($scope.node.nid);
            }
            else {
                FavoritesService.addFavorite($scope.node.nid);
            }
            $scope.isFavorite = !$scope.isFavorite;
        };

        function getNode(nodeId) {
            Node.getNode({nodeId: nodeId}).$promise
                .then(function (data) {
                    logger.debug('Ctrl got data');
                    $scope.node = data;
                    return data;
                })
                .then(function (session) {
                    //var trackIds = session.trackIds;
                    //angular.forEach(trackIds, function (trackId) {
                    //    CacheService.getTrack({trackId: trackId}).$promise
                    //        .then(function (track) {
                    //            $scope.tracks.push(track);
                    //        })
                    //        .catch(function (err) {
                    //            $log.error('Failed !' + err);
                    //        });
                    //});
                    //return session;
                })
                .then(function (session) {
                    //PersistenceService.getSessionFromMySchedule(session.id)
                    //    .then(function (data) {
                    //        $scope.isOnMySchedule = typeof(data) !== 'undefined';
                    //    });
                })
                .catch(function (err) {
                    //$log.error('Failed !' + err);
                });
        }

    }

})();