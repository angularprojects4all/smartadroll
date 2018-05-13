smartAdRoll.controller('placementSearchVideoCtrl', function ($rootScope, $scope, $state, $location, $http, $stateParams, flash) {
    $scope.flash = flash;

    console.log($stateParams)
    $scope.search1 = $stateParams.search;
    $scope.init = function () {
        $scope.filter = {
            page: 1,
            size: 10,
            count: 0,
            keyword: '',
        };
        $rootScope.sideNavSubHeading = "Placement Search";
        $scope.searchVideos();
    };

    $scope.searchVideos = function () {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $http.get("/temp/placement-search.json").then(function (response) {
            $scope.results = response;
            $scope.totalCount = response.length;
        })
    }
});