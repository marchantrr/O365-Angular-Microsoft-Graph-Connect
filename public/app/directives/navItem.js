(function () {
    angular.module('MSGraphConsoleApp')
        .directive('navItem',['$templateCache','$compile','$http',function($templateCache,$compile,$http){
            var definition = {
                restrict: 'E',
                replace: true,
                scope: {
                    node:'=',
                    template:'@'
                }    
            };
            definition.link = function postLink(scope, element) {
                scope.show = 'none';
                scope.template=scope.template||'templates/navitem.html';
                scope.$watch('node',function() {
                    compile();
                });
                var compile = function() {
                    $http.get(scope.template, { cache: $templateCache }).success(function(html) {
                    element.html(html);
                    $compile(element.contents())(scope);
                    });
                };
            };
            return definition;
        }])
})();