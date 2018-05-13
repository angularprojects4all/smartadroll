smartAdRoll.controller('keywordSearchCtrl', function ($rootScope, $scope, $state, $location, StorageService, $http, flash, exportService) {
    $scope.flash = flash;
    $rootScope.sideNavHeading = "Tool Suite";
    $rootScope.sideNavActImg = "./assets/images/gearpng.png";
    $rootScope.sideNavSubHeading = "Placement Search";
    $scope.init = function () {
        $scope.user = {
            userName: '', email: '', password: '',
        };
        $scope.currentPage = 1;
        $rootScope.sideNavSubHeading = "Keyword Search";
        $scope.getAllKeyowrds();
        $scope.currentPage = 1;
        $scope.pageSize = 10;

    };

    $scope.pageChanged = function (page) {
       $scope.keywords = $scope.keywords_bkp.slice((page-1)*$scope.pageSize, (page-1)*$scope.pageSize+$scope.pageSize);
    }

    $scope.getAllKeyowrds = function() {
        $http.get(API_PREFIX+"/temp/keywor-search"+API_SUFFIX).then(function (response) {
           $scope.keywords = response.data;
           $scope.keywords_bkp = response.data;
           $scope.totalCount = response.data.length;
        })
    };
});