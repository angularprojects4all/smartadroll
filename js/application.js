var smartAdRoll = angular.module('smartadroll', ['ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'ngTagsInput', 'rzModule', 'angularjs-dropdown-multiselect']).filter('pagination', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    };
});

String.prototype.startsWith = function (str) {
   return (this.indexOf(str) == 0);
}


//constants
var authToken = "";

angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null;
};

smartAdRoll.directive('onErrorSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.onErrorSrc) {
                    attrs.$set('src', attrs.onErrorSrc);
                }
            });
            attrs.$observe('ngSrc', function (value) {
                if (!value && attrs.onErrorSrc) {
                    attrs.$set('src', attrs.onErrorSrc);
                }
            });
        }
    };
});

smartAdRoll.directive('tooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).hover(function () {
                // on mouseenter
                $(element).tooltip('show');
            }, function () {
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});

smartAdRoll.factory('ngClipboard', function ($compile, $rootScope, $document) {
    return {
        toClipboard: function (element) {
            var copyElement = angular.element('<span id="ngClipboardCopyId">' + element + '</span>');
            var body = $document.find('body').eq(0);
            body.append($compile(copyElement)($rootScope));
            var ngClipboardElement = angular.element(document.getElementById('ngClipboardCopyId'));
            var range = document.createRange();
            range.selectNode(ngClipboardElement[0]);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            window.getSelection().removeAllRanges();
            copyElement.remove();
        }
    }
});

smartAdRoll.directive('numericOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g, '') : null;
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

smartAdRoll.directive('allowPattern', [function () {
    return {
        restrict: "A",
        compile: function (tElement, tAttrs) {
            return function (scope, element, attrs) {
                element.bind("keypress", function (event) {
                    var keyCode = event.which || event.keyCode;
                    var keyCodeChar = String.fromCharCode(keyCode);
                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
                        event.preventDefault();
                        return false;
                    }
                });
            };
        }
    };
}
]);

/*set focus on textbox*/
smartAdRoll.directive('autoFocus', function ($timeout) {
    return {
        restrict: 'AC',
        link: function (_scope, _element) {
            $timeout(function () {
                _element[0].focus();
            }, 0);
        }
    };
});

smartAdRoll.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
});

smartAdRoll.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, { $event: event });
                });
                event.preventDefault();
            }
        });
    };
});

smartAdRoll.directive('noImage', function () {
var defaultImage = ""
    var setDefaultImage = function (el) {
        el.attr('src', defaultImage);
    };
    return {
        restrict: 'A',
        link: function (scope, el, attr) {
            scope.$watch(function () {return attr.ngSrc;}, function () { var src = attr.ngSrc; if (!src) { setDefaultImage(el); }
        });
        el.bind('error', function () { setDefaultImage(el); });
        }
    };
});
smartAdRoll.directive('typeaheadShowOnFocus', function () {
    return {
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            element.bind('focus', function () {
                if(ngModel.$viewValue==''||angular.isUndefinedOrNull(ngModel.$viewValue)) {
                    ngModel.$setViewValue();
                    $(element).trigger('input');
                    $(element).trigger('change');
                }
            });
        }
    };
});


smartAdRoll.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: true
    });
    //.hashPrefix('!');
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        if (path.indexOf("/!/") != -1) {
            var newPath = path.replace("\/\!", "");
            $location.replace().path(newPath);
        }
    });
    
    // $urlRouterProvider.otherwise(function ($injector) {
    //     var $state = $injector.get('$state');
    //     $state.go('main.404', null, {
    //         location: false
    //     });
    // });
    $urlRouterProvider.otherwise("/login");
    $urlRouterProvider.when("", "/login");
    $stateProvider.state('main', {
        url: '',
        views: {
            '': { templateUrl: 'partials/body.html?v=1.20180418' },
            'header@main': {
                templateUrl: 'partials/header.html?v=1.20180418',
                controller: 'mainCtrl'
            },
            'footer@main': {
                templateUrl: 'partials/footer.html?v=1.20180418',
                controller: 'mainCtrl'
            }
        }
    })
    .state('main.404', {
        url:'/404',
        templateUrl:'partials/404.html'
    })
    .state('home', {
        url: '',
        views: {
            '': { templateUrl: 'partials/body.html' },
        }
    })
    .state('main.home1', {
        url: '/', templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
    })
    .state('main.login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        params: {
            isEmailChanged: null
        },
        controller: "loginCtrl"
    })
    .state('main.register', {
        url: '/register',
        templateUrl: 'partials/register.html',
        controller: "registerCtrl"
    })
    .state('main.profile', {
        url:'/profile',
        templateUrl: 'partials/profile.html',
        controller:function() {
            
        }
    })
    .state('main.toolsuite', {
        url: '/toolsuite',
        templateUrl: 'partials/toolsuite.html',
        controller: 'toolsuiteCtrl'
    })
    .state('main.placementSearchbyvideo', {
        url: '/toolsuite/placement-search/by-video',
        templateUrl: 'partials/toolsuite/placement-search-byvideo.html',
        controller: 'placementSearchVideoCtrl'
    })
    .state('main.placementSearchbyChannel', {
        url: '/toolsuite/placement-search/by-channel',
        templateUrl: 'partials/toolsuite/placement-search-bychannel.html',
        controller: 'placementSearchVideoCtrl'
    })
    .state('main.placementSearchbyKeyword', {
        url: '/toolsuite/placement-search/by-keyword',
        templateUrl: 'partials/toolsuite/placement-search-bykeyword.html',
        controller: 'placementSearchVideoCtrl'
    })
    .state('main.keywordSearch', {
        url: '/toolsuite/keyword-search',
        templateUrl: 'partials/toolsuite/keywordsearch.html',
        controller: 'keywordSearchCtrl'
    })
    .state('main.channelSearch', {
        url: '/toolsuite/channel-search',
        templateUrl: 'partials/toolsuite/channelsearch.html',
        controller: 'keywordSearchCtrl'
    })
    .state('main.keywordLists', {
        url: '/toolsuite/keyword-lists',
        templateUrl: 'partials/toolsuite/keywordlists.html',
        controller: 'keywordListCtrl'
    })
    .state('main.placementLists', {
        url: '/toolsuite/placement-lists',
        templateUrl: 'partials/toolsuite/placementlists.html',
        controller: 'keywordListCtrl'
    })
    // .state('main.toolsuitesub', {
    //     url: '/toolsuite/:criteria',
    //     templateUrl: 'partials/videos.html',
    //     controller:'toolsuiteCtrl',
    //     params: {
    //         criteria:{  }
    //     }
    // })
    //more states go above
}).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('noCacheInterceptor');
}]).config(['$compileProvider', function($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|http?|javascript):/);
}]).factory('noCacheInterceptor', function () {
    return {
        request: function (config) {
            if (config.url.indexOf('/admin/') >= 0) {
                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                config.url = config.url + separator + 'noCache=' + new Date().getTime();
            }
            return config;
        }
    };
});
