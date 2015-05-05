(function() {
    'use strict';

    angular
        .module('app.feeds')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('tab.feeds', {
                url: '/feeds',
                views: {
                    'tab-feeds': {
                        templateUrl: 'app/feeds/templates/tab.html',
                        controller: 'FeedsController'
                    }
                }
            });

    }

})();
