(function () {
    'use strict';

    angular
        .module('app.node')
        .factory('NodeHttpRequest', NodeHttpRequest);

    NodeHttpRequest.$inject = ['$q', '$http', 'logger'];

    function NodeHttpRequest($q, $http, logger) {

        var node = {
            get: get
        };

        return node;
        ////////////////////////////////////////////////////////////////////////




        function get (nodeId) {
            logger.info('httpRequest');
            var apiURL = 'http://local.drupal8:8888/node/' + nodeId;
            return $http.get(apiURL)
                .then(httpRequestSuccess, httpRequestError);
        };

        function httpRequestSuccess (response) {
            logger.info('httpRequestSuccess');
            // console.log(response);
            var node = {
                'uuid': response.data.uuid[0].value,
                'nid': response.data.nid[0].value,
                'title': response.data.title[0].value,
                'body': response.data.body[0].value,
                'changed': response.data.changed[0].value,
                'created': response.data.created[0].value
            };
            return node;
        };

        function httpRequestError (error) {
            logger.info('httpRequestError');
            return error;
        };

    }

})();
