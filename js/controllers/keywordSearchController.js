smartAdRoll.controller('keywordSearchCtrl', function ($rootScope, $scope, $state, $location, StorageService, $http) {
    
    $scope.init = function () {
        $scope.user = {
            userName: '', email: '', password: '',
        };
        $scope.currentPage = 1;
        $scope.pageSize = 50;
        $rootScope.sideNavSubHeading = "Keyword Search";
        $scope.getAllKeyowrds();

    };

    $scope.getAllKeyowrds = function() {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $http.get("/temp/user-response.json").then(function (response) {
            $scope.keywords = response.data.data.proAccounts;
            $scope.totalCount = response.data.data.count;
        })
    }

});