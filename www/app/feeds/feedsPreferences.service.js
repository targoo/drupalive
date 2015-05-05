(function () {
    'use strict';

    angular
        .module('app.feeds')
        .factory('FeedsPreferences', FeedsPreferences);

    FeedsPreferences.$inject = ['$q', 'DSCacheFactory', 'logger'];

    function FeedsPreferences($q, DSCacheFactory, logger) {

        var feedsPreferencesCache = DSCacheFactory('feedsPreferencesCache', {
            storageMode: "localStorage",
            maxAge: 600000000
        });

        var preferences = {
            setOrderBy: setOrderBy,
            getOrderBy: getOrderBy
        };

        return preferences;
        ////////////////////////////////////////////////////////////////////////




        function setOrderBy (orderBy) {
            logger.info('setOrderBy');
            feedsPreferencesCache.put('orderBy', orderBy);
        };

        function getOrderBy () {
            logger.info('getOrderBy');
            var orderBy = feedsPreferencesCache.get('orderBy');
            if (!orderBy) {
                return 'title';
            }
            else {
                return orderBy;
            }
        };

    }

})();
