smartAdRoll.service('StorageService', ['$http', '$rootScope', '$filter', function ($http, $rootScope, $filter) {

    this.setItem = function (itemName, item){
        localStorage.setItem(itemName, item);
    };

    this.getItem = function (itemName) {
        return localStorage.getItem(itemName);
    };

    this.removeItem = function (itemName) {
        localStorage.removeItem(itemName);
    };

    this.clear = function () {
        localStorage.clear();
    };
}]);