(function () {
    'use strict';

    angular
        .module('app.feeds')
        .directive('feedItem',feedItem);

    feedItem.$inject = ['logger'];

    function feedItem(logger) {

        return {
            templateUrl: 'app/feeds/templates/item.html',
            restrict: 'E',
            //scope: {
            //    sessions: '=',
            //    filterObject: '=?',
            //    showTimeSlots: '=?'
            //},
            //controller: function($scope) {
            //    $scope.filterObject = $scope.filterObject || undefined;
            //    $scope.showTimeSlots = $scope.showTimeSlots || false;
            //}
        };
        ////////////////////////////////////////////////////////////////////////

    }

})();
