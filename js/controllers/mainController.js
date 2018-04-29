smartAdRoll.controller('mainCtrl', function ($rootScope, $scope, $state, $location, StorageService) {
    $rootScope.$state = $state;
    $scope.logoUrl = LOGO_URL;
    $scope.NAV_BTN_BG_IMG = NAV_BTN_BG_IMG;
    $scope.NAV_BTN_BG_IMG_ACTIVE = NAV_BTN_BG_IMG_ACTIVE;
    $rootScope.NAV_BTN_BG_IMG = NAV_BTN_BG_IMG;
    $rootScope.NAV_BTN_BG_IMG_ACTIVE = NAV_BTN_BG_IMG_ACTIVE;
    $rootScope.LOGIN_BG = LOGIN_BG;
    $scope.navImages = [];
    $scope.navImages = navImages;
    $rootScope.logout = function () {
        $rootScope.userLoginStatus = false;
        StorageService.setItem("UseDetails", null);
        StorageService.setItem("status", "loggedout");
        $state.go("main.login");
    };

    $rootScope.getShowstatus = function () {
        if($state.current.name == 'main.login') return false;
        return true;
    }
});