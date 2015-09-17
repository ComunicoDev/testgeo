angular.module('starter.directives', [])

.directive('geocanvas', function($window) {
    function resize(element, parent) {
        element.width(parent.width());
        element.height(parent.height());
    }
    function resizeCanvas(element, parent) {
        element.width = parseInt(parent.width(), 10);
        element.height = parseInt(parent.height(), 10);
    }
    return function(scope, element) {
        scope.$parent.canvas = document.createElement('canvas');
        scope.parentEl = element.parent();
        element.append(scope.$parent.canvas);

        element.css('display', 'block');

        //angular.element($window).load(function () {
        resize(element, scope.parentEl);
        resizeCanvas(scope.$parent.canvas, element);
        //});

        scope.$watch(
            function () {
                return {
                    width: scope.parentEl.width(),
                    height: scope.parentEl.height(),
                }
            },
            function () {
                resize(element, scope.parentEl);
                resizeCanvas(scope.$parent.canvas, element);
                //return scope.$apply();
            }, //listener
            true //deep watch
        );

        angular.element($window).bind('resize', function(event) {
            resize(element, scope.parentEl);
            resizeCanvas(scope.$parent.canvas, element);
            return scope.$apply();
        });
    };
});
