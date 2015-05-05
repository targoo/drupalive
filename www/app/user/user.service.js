(function () {
    'use strict';

    angular
        .module('app.user')
        .factory('User', User);

    User.$inject = ['$q', 'localstorage'];

    function User($q, localstorage) {
        var name = 'name';

        var user = {
            name: name
        };

        return feed;
        ////////////////////////////////////////////////////////////////////////

    }

})();
