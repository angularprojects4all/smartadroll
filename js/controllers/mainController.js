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

    $rootScope.sideNavHeading = "Tool Suite";
    $rootScope.sideNavActImg = "./assets/images/toolsuite.png";
    $rootScope.sideNavSubHeading = "Placement Search";

    $rootScope.collapse = false;
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

    $rootScope.getSideNavSubHeading = function () {
        return $rootScope.sideNavSubHeading;
    };

    $scope.getActiveStatus = function () {
        return $state.current.url.indexOf('placement-search')>=0 || $state.current.url.indexOf('channel-search')>=0;
    }
});