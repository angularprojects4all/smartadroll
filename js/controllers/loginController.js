smartAdRoll.controller('loginCtrl', function ($rootScope, $scope, $state, $location, StorageService) {
    
    $scope.init = function () {
        $scope.user = {
            userName: '', email: '', password: '',
        };

    };

    $scope.login = function (user) {
        if(angular.isUndefinedOrNull(user)||angular.isUndefinedOrNull(user.userName)||angular.isUndefinedOrNull(user.password)) {
            $scope.error = 'Please enter mandatory fields';
            return;
        }
        $rootScope.userLoginStatus = true;
        StorageService.setItem("UseDetails", user);
        StorageService.setItem("status", "loggedin");
        $state.go("main.toolsuite");
    };

});