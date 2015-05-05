(function() {
    'use strict';

    angular
        .module('app.node')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('tab.node', {
                url: '/node/:nodeId',
                views: {
                    'tab-feeds': {
                        templateUrl: 'app/node/templates/tab.html',
                        controller: 'NodeController'
                    }
                }
            });

    }

})();
