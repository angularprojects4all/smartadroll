freedocastAdmin.service('backendService', ['$http', 'cookieService', '$rootScope', function ($http, cookieService, $rootScope) {

    this.post = function (urlSuffix, dataObj, isHeaderNeeded) {
        var promiss = {};
        if (isHeaderNeeded) {
            promiss = $http({
                method: 'POST',
                url: freedocastAdminServiceUrl_base + urlSuffix,
                data: dataObj ? dataObj : {},
                headers: getHeaders()
            }).then(function (response) {
                return response.data;
            });
            return promiss;
        }
        else {
            promiss = $http({
                method: 'POST',
                url: freedocastAdminServiceUrl_base + urlSuffix,
                data: dataObj ? dataObj : {},
            }).then(function (response) {
                return response.data;
            });
            return promiss;
        }
    };

    this.put = function (urlSuffix, dataObj) {
        var credentials = cookieService.getCredentials("userCredentials");
        var promiss = {};
        promiss = $http({
            method: 'PUT', url: freedocastAdminServiceUrl_base + urlSuffix, data: dataObj ? dataObj : {},
            headers: { 'Content-Type': 'application/json', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null, 'accept-encoding': 'identity' }
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.get = function (urlSuffix, isHeaderNeeded) {
        var promiss = {};
        if (isHeaderNeeded) {
            promiss = $http({
                method: 'GET', url: freedocastAdminServiceUrl_base + urlSuffix,
                headers: getHeaders()
            }).then(function (response) {
                return response.data;
            });
            return promiss;
        }

        else {
            promiss = $http({
                method: 'GET', url: freedocastAdminServiceUrl_base + urlSuffix,
            }).then(function (response) {
                return response.data;
            });
            return promiss;
        }
    };

    this.delete = function (urlSuffix, dataObj) {
        var promiss = $http({
            method: 'DELETE', url: freedocastAdminServiceUrl_base + urlSuffix,
            headers: getHeaders(),
            data: dataObj
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.deleteWithOutObj = function (urlSuffix, data) {
        var credentials = cookieService.getCredentials("userCredentials");
        var promiss = $http({
            method: 'DELETE', url: freedocastAdminServiceUrl_base + urlSuffix,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null },
            transformRequest: function () {
                var str = [];
                for (var p in data)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            }
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    var getHeaders = function () {
        var credentials = cookieService.getCredentials("userCredentials");
        return { 'Content-Type': 'application/json', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null }
    };

    this.postFormDataWithOutEncode = function (urlSuffix, data) {
        var credentials = cookieService.getCredentials("userCredentials");
        var promiss = {};
        promiss = $http({
            method: 'POST',
            url: freedocastAdminServiceUrl_base + urlSuffix,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null },
            data: data,
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + obj[p]);
                return str.join("&");
            },
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.postFormData1 = function (urlSuffix, data) {
        var credentials = cookieService.getCredentials("userCredentials");
        var promiss = {};
        promiss = $http({
            method: 'POST',
            url: freedocastAdminServiceUrl_base + urlSuffix,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null},
            data: data,
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.putFormData1 = function (urlSuffix, data) {
        var credentials = cookieService.getCredentials("userCredentials");
        var promiss = {};
        promiss = $http({
            method: 'PUT',
            url: freedocastAdminServiceUrl_base + urlSuffix,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null },
            data: data,
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.changePassword = function (oldpwd, newpwd) {
        var credentials = cookieService.getCredentials("userCredentials");
        var promiss = $http({
            method: 'POST',
            url: freedocastAdminServiceUrl_base + "/admin/changePassword?oldPassword=" + encodeURIComponent(oldpwd) + "&newPassword=" + encodeURIComponent(newpwd),
            headers: { 'Content-Type': 'application/json', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null }
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.forgotPassword = function (data) {
        var promiss = $http({
            method: 'POST',
            data: data,
            url: freedocastAdminServiceUrl_base + '/admin/forgotPassword',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function () {
                var str = [];
                for (var p in data)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            }
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.getEvents = function (urlSuffix) {
        var credentials = cookieService.getCredentials("userCredentials");
        var promiss = {};
        promiss = $http({
            method: 'GET', url: freedocastAdminServiceUrl_base + urlSuffix,
            headers: { 'Content-Type': 'application/json', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null}
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.getEventsV2 = function (urlSuffix) {
        var credentials = cookieService.getCredentials("userCredentials");
        var promiss = {};
        promiss = $http({
            method: 'GET', url: freedocastAdminServiceUrl_base + urlSuffix,
            headers: { 'Content-Type': 'application/json', 'X-User-Id': credentials ? credentials.userId : null, 'X-Auth-Token': credentials ? credentials.xAuthToken : null }
        }).then(function (response) {
            return response.data;
        });
        return promiss;
    };

    this.campaignsList = function (filter) {
        if(angular.isUndefinedOrNull (filter.from) || filter.from=='') {
            var url = campaignUrl + '/marketing_campaign/list';
        }
        else {
            var url = campaignUrl + "/marketing_campaign/list?startTime="+filter.from+"&endTime="+filter.to;
        }
        var promiss = {}
        promiss = $http({
            method: 'GET', url: url,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response){ return response.data;});
        return promiss;
    };

}]);