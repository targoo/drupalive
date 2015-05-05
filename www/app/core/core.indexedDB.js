(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('indexedDB', indexedDB);

    indexedDB.$inject = ['$window', '$q', 'DATABASE', 'logger'];

    function indexedDB($window, $q, DATABASE, $log) {




        var database = $q.defer();

        var dbOpenRequest = $window.indexedDB.open(DATABASE.name, DATABASE.version);

        dbOpenRequest.onerror = function (evt) {
            //$log.error('[Persistence] Cannot open database ' + evt.target.error.message);
            database.reject(evt.target.error.message);
        };

        dbOpenRequest.onsuccess = function () {
            database.resolve(dbOpenRequest.result);
            //$log.info('[Persistence] Database ' + DATABASE.name + ' version ' + DATABASE.version + ' opened');
        };

        dbOpenRequest.onupgradeneeded = function (evt) {
            //$log.info('[Persistence] Upgrading database');
            var db = evt.target.result;
            var knownStores = db.objectStoreNames;
            for (var store in DATABASE.stores) {
                console.log('[Persistence] need store ' + store + ']');
                if (DATABASE.stores.hasOwnProperty(store) && typeof(knownStores) === 'undefined' || !knownStores.contains(store)) {
                    var objectStore = db.createObjectStore(DATABASE.stores[store], {keyPath: 'id'});
                    console.log('[Persistence] store "' + store + '" successfully created');
                }
            }
        };







        return {
            deleteDatabase: deleteDatabase,
            getNode: getNode,
            putNode: putNode,
            put: put
        };
        ////////////////////////////////////////////////////////////////////////









        function getNode (nid) {
            console.log('[Persistence] Get node data from database');
            return get(DATABASE.stores.nodes, nid);
        };

        function putNode (node) {
            console.log('[Persistence] try add node with id ' + node.id);
            return put(DATABASE.stores.nodes, node);
        };

        function deleteDatabase () {
            console.log('Deleting whole database');

            var deferred = $q.defer();

            var request = $window.indexedDB.deleteDatabase(DATABASE.name);
            request.oncomplete = function() {
                deferred.resolve();
            };

            request.onerror = function(evt) {
                deferred.reject(evt.target.error);
            };

            return deferred.promise;
        };

















        ////////////////////////////////////////////////////////////////////////
        function get(store, id) {
            // this will hold the final result
            var deferred = $q.defer();

            /**
             * (0) wait before executing the query until the database is opened
             * (1) open datastore and execute get request
             * (2) fulfill or reject promise
             * (N) log error in any case
             */
            database.promise
                .then(function (db) {
                    $log.debug('[Persistence] Database connected');
                    var objectStore = db.transaction([store]).objectStore(store);
                    $log.debug('[Persistence] execute query...');
                    var request = objectStore.get(id);

                    request.onerror = function (evt) {
                        $log.warn('Query failed' + evt.target.error.message + ' : ' + evt.target.error.code);
                        deferred.reject(evt.target.error.message);
                    };
                    request.onsuccess = function (evt) {
                        $log.debug('[Persistence] got data result');
                        var obj = evt.target.result;
                        deferred.resolve(obj);
                    };
                })
                .catch(function (evt) {
                    $log.warn('[Persistence] error' + evt);
                });
            return deferred.promise;
        }









        function put(store, object) {
            var deferred = $q.defer();

            if (typeof(object.id) === 'undefined') {
                deferred.reject('Cannot insert undefined object');
            }
            else {
                database.promise
                    .then(function (db) {

                        console.log('[Persistence] Database connected');
                        console.log('[Pesistence] --> Put session to database');

                        var tx = db.transaction([store], 'readwrite');
                        console.log(tx);
                        tx.oncomplete = function () {
                            console.log('[Persistence] tx finished');
                        };

                        tx.onerror = function (evt) {
                            console.log('[Persistence] Cannot complete transaction ' + evt.target.errorCode);
                        };

                        var objStore = tx.objectStore(store);

                        var request = objStore.add(object);

                        request.onsuccess = function (evt) {
                            console.log('[Persistence] successfully added [' + object + ']');
                            deferred.resolve(evt.target.result);
                        };

                        request.onerror = function (evt) {
                            console.log('[Persistence] Could add object (' + evt.target.error.message + ') for [' + object + ']');
                            deferred.reject(evt.target.error.message);
                        };

                    }).
                    catch(function (evt) {
                        console.log('[Persistence] Could add object (' + evt.target.error.message + ') for [' + object + ']');
                    });
            }
            return deferred.promise;
        }

    }

})();
