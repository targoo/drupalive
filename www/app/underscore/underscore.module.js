(function() {
    'use strict';

    angular
        .module('underscore', [])

        .factory('_', function() {
            return window._;
        })

        .run(function(_) {
            //console.log(_.first([5, 4, 3, 2, 1]));
        })

})();
