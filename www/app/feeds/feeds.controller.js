(function () {
    'use strict';

    angular
        .module('app.feeds')
        .controller('FeedsController', FeedsController);

    FeedsController.$inject = ['$scope', '$q', 'logger', 'Feeds', 'FeedsPreferences'];

    function FeedsController($scope, $q, logger, Feeds, FeedsPreferences) {

        $scope.feeds = [];
        $scope.hasMoreData = true;
        $scope.search = '';
        $scope.orderBy = FeedsPreferences.getOrderBy();

        $scope.loadMore = loadMore;
        $scope.doRefresh = doRefresh;
        $scope.setOrderBy = setOrderBy;
        $scope.setFilter = setFilter;
        $scope.clear = clear;

        ////////////////////////////////////////////////////////////////////////





        function loadMore() {
            logger.info('loadMore');
            Feeds.load(false, false)
                .then(onResponse)
                .catch(onError)
                .finally(function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            );
        }

        function doRefresh() {
            logger.info('doRefresh');
            Feeds.load(true, true)
                .then(onResponse)
                .catch(onError)
                .finally(function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            );
        }

        function setOrderBy() {
            logger.info('setOrderBy');
            FeedsPreferences.setOrderBy($scope.orderBy);
            Feeds.load(false, true).then(onResponse, onError);
        }

        function setFilter() {
            //logger.info('setFilter');
        }

        function clear() {
            logger.info('clear');
            $scope.search = '';
        }

        function onResponse(response) {
            logger.success('Feeds loaded');
            $scope.feeds = response;
            $scope.hasMoreData = Feeds.hasMoreData();
        }

        function onError(error) {
            logger.error(error);
            $scope.feeds = [];
        }

    }

})();
