smartAdRoll.service('apiService', ['$http', 'cookieService', '$rootScope', function ($http, cookieService, $rootScope) {

    this.post = function (urlSuffix, dataObj, isHeaderNeeded) {
        var promiss = {};
        if (isHeaderNeeded) {
            promiss = $http({
                method: 'POST',
                url: smartAdRollServiceUrl_base + urlSuffix,
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
                url: smartAdRollServiceUrl_base + urlSuffix,
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
            method: 'PUT', url: smartAdRollServiceUrl_base + urlSuffix, data: dataObj ? dataObj : {},
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
                method: 'GET', url: smartAdRollServiceUrl_base + urlSuffix,
                headers: getHeaders()
            }).then(function (response) {
                return response.data;
            });
            return promiss;
        }

        else {
            promiss = $http({
                method: 'GET', url: smartAdRollServiceUrl_base + urlSuffix,
            }).then(function (response) {
                return response.data;
            });
            return promiss;
        }
    };

    this.delete = function (urlSuffix, dataObj) {
        var promiss = $http({
            method: 'DELETE', url: smartAdRollServiceUrl_base + urlSuffix,
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
            method: 'DELETE', url: smartAdRollServiceUrl_base + urlSuffix,
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
            url: smartAdRollServiceUrl_base + urlSuffix,
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
            url: smartAdRollServiceUrl_base + urlSuffix,
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
            url: smartAdRollServiceUrl_base + urlSuffix,
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
            url: smartAdRollServiceUrl_base + "/admin/changePassword?oldPassword=" + encodeURIComponent(oldpwd) + "&newPassword=" + encodeURIComponent(newpwd),
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
            url: smartAdRollServiceUrl_base + '/admin/forgotPassword',
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

    

}]);