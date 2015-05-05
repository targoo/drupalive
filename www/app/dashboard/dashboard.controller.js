(function () {
    'use strict';

    angular
        .module('app.dashboard')

        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$q', 'Feeds'];

    function DashboardController($scope, $q, Feeds) {

        $scope.feeds = 0;

        //activate();
        ////////////////////////////////////////////////////////////////////////




        function activate() {
            var promises = [Feeds.load()];
            return $q.all(promises).then(function() {
                $scope.feeds = Feeds.feedsLength;
            });
        }



    }

})();