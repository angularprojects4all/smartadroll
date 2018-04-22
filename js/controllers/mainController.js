smartAdRoll.controller('mainCtrl', function ($rootScope, $scope, $state, $location, StorageService) {
    $scope.logoUrl = LOGO_URL;
    $scope.NAV_BTN_BG_IMG = NAV_BTN_BG_IMG;
    $scope.NAV_BTN_BG_IMG_ACTIVE = NAV_BTN_BG_IMG_ACTIVE;
    $rootScope.NAV_BTN_BG_IMG = NAV_BTN_BG_IMG;

    $rootScope.logout = function () {
        $rootScope.userLoginStatus = false;
        StorageService.setItem("UseDetails", null);
        StorageService.setItem("status", "loggedout");
        $state.go("main.login");
    };
});