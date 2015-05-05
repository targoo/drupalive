(function () {
    'use strict';

    angular
        .module('app.node')
        .factory('Node', Node);

    Node.$inject = ['$q', '$http', 'logger', 'indexedDB', 'NodeHttpRequest'];

    function Node($q, $http, logger, indexedDB, NodeHttpRequest) {

        return {
            getNode: getNode,
            putNode: putNode
        };
        ////////////////////////////////////////////////////////////////////////





        function getNode(nodeId) {
            return NodeHttpRequest.get(nodeId).then(function (data) {
                return data;
            });


/*            logger.debug('proxying object');
            var value = {};
            var deferred = $q.defer();

            indexedDB.getNode(params.sessionId)
                .then(function (data) {
                    logger.debug('[CacheService] Got cached data:' + data);
                    if (typeof(data) === 'undefined') {
                        SessionService.get(params).$promise
                            .then(function (loadedData) {
                                var result = loadedData.result;
                                indexedDB.putSession(result)
                                    .then(function () {
                                        logger.debug('[CacheService] object successfully put to cache');
                                    })
                                    .catch(function () {
                                        logger.warn('[CacheService] could not cache object');
                                    })
                                    .finally(function () {
                                        logger.debug('[CacheService] returning result for ' + params.sessionId);
                                        deferred.resolve(result);
                                    });
                            })
                            .catch(deferred.reject);
                    }
                    else {
                        deferred.resolve(data);
                    }
                })
                .catch(deferred.reject);

            value.$promise = deferred.promise;
            return value;

            */

        };


        function putNode(node) {
            var node = {
                "id": "2",
                "text": "text"
            };

            var deferred = $q.defer();

            indexedDB.putNode(node)
                .then(function () {
                    console.log('[CacheService] object successfully put to cache');
                })
                .catch(function () {
                    console.log('[CacheService] could not cache object');
                })
                .finally(function () {
                    console.log('[CacheService] returning result for ' + node.nid);
                    deferred.resolve(node);
                    return deferred.promise;
                });

            return deferred.promise;

        };

    }

})();
