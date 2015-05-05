(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', '$http', 'localstorage', '_'];

    function dataservice($q, $http, localstorage, _) {
        var apiURL = 'http://local.drupal8:8888/feeds',
            config = {timeout: 10000};

        var service = {
            getFeeds: getFeeds,
            getFeed: getFeed
        };

        return service;

        function getFeeds() {
            // Return a promise.
            return $http.get(apiURL, config)
                .success(function(data) {
                    console.log('success');
                })
                .error(function(data) {
                    console.log('error');
                });
        }

        function getFeed(feedId) {
            // Return a promise.
            return $http.get(apiURL, config)
                .success(function(data) {
                })
                .error(function(data) {
                });
        }

    }

})();
