smartAdRoll.controller('toolsuiteCtrl', function ($rootScope, $scope, $state, $location, $http) {

    $scope.init = function () {
        $scope.filter = {
            page: 1,
            size: 10,
            count: 0,
            keyword: '',
        }
    };

    $scope.searchVideos = function () {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $http.get("/temp/user-response.json").then(function (response) {
            console.log(response);
            $scope.videos = response.data.data.proAccounts;
            $scope.totalCount = response.data.data.count;
        })
    }
});