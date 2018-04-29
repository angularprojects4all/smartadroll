smartAdRoll.controller('loginCtrl', function ($rootScope, $scope, $state, $location, StorageService) {
    
    $scope.init = function () {
        $scope.user = {
            userName: '', email: '', password: '',
        };

    };

    $scope.doLogin = function (user, keepmesign) {
        if(user.email=='') {
            $scope.lgnError = 'Please enter email'; return;
        }
        else if(user.password == '') { $scope.lgnError = 'Please enter password'; return;}
        if(angular.isUndefinedOrNull(user.userName)||angular.isUndefinedOrNull(user.password)) {
            $scope.lgnError = 'Please enter mandatory fields';
            return;
        }
        $scope.lgnError = '';
        $rootScope.userLoginStatus = true;
        StorageService.setItem("UseDetails", user);
        StorageService.setItem("status", "loggedin");
        $state.go("main.toolsuite");
    };

});