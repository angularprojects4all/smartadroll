smartAdRoll.controller('mainCtrl', function ($rootScope, $scope, $state, $location, StorageService, exportService) {
    $rootScope.$state = $state;
    $scope.logoUrl = LOGO_URL;
    $scope.NAV_BTN_BG_IMG = NAV_BTN_BG_IMG;
    $scope.NAV_BTN_BG_IMG_ACTIVE = NAV_BTN_BG_IMG_ACTIVE;
    $rootScope.NAV_BTN_BG_IMG = NAV_BTN_BG_IMG;
    $rootScope.NAV_BTN_BG_IMG_ACTIVE = NAV_BTN_BG_IMG_ACTIVE;
    $rootScope.LOGIN_BG = LOGIN_BG;
    
    $scope.navImages = [];
    $scope.navImages = navImages;

    if($state.current.url.indexOf('toolsuite')>=0) {
        $rootScope.sideNavHeading = "Tool Suite";
        $rootScope.sideNavActImg = "./assets/images/gearpng.png";
        $rootScope.sideNavSubHeading = "Placement Search";
    }
    else if($state.current.name.indexOf('profile')>=0) {
        $rootScope.sideNavHeading = "My Account";
        $rootScope.sideNavActImg = "./assets/images/myaccountpng.png";
        $rootScope.sideNavSubHeading = "Account";
    }

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
    };

    $rootScope.exportTable = function (tableId, exportExtension, fileName) {
        var excludeColumns = true;
        exportService.export(tableId, exportExtension, fileName, excludeColumns);
    };
});