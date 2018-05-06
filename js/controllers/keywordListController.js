smartAdRoll.controller('keywordListCtrl', function ($rootScope, $scope, $state, $location, StorageService, $http) {
    
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
        $scope.keywordLists = [
            {created: '2018-05-16 18:22', updated: '2018-07-19 09:18', listName: 'Design', videos: 10},
            {created: '2018-05-16 18:22', updated: '2018-07-19 09:18', listName: 'Design', videos: 10},
            {created: '2018-05-16 18:22', updated: '2018-07-19 09:18', listName: 'Design', videos: 10},
            {created: '2018-05-16 18:22', updated: '2018-07-19 09:18', listName: 'Design', videos: 10},
            {created: '2018-05-16 18:22', updated: '2018-07-19 09:18', listName: 'Design', videos: 10},
            {created: '2018-05-16 18:22', updated: '2018-07-19 09:18', listName: 'Design', videos: 10},
        ]
    }

});