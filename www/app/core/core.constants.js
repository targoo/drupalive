(function() {
    'use strict';

    angular
        .module('app.core')

        .constant('DATABASE', {
            name: 'drupalive',
            version: 1,
            stores: {
                nodes: 'Nodes'
            }
        });

})();
