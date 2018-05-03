smartAdRoll.controller('placementSearchVideoCtrl', function ($rootScope, $scope, $state, $location, $http) {

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
        $http.get("/temp/user-response.json").then(function (response) {
            $scope.results = response.data.data.proAccounts;
            $scope.totalCount = response.data.data.count;
        })
    }
});