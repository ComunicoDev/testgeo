angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('TestGeoCtrl', function ($scope, $timeout, $window, $timeout, $cordovaGeolocation) {
        var canvas, ctx, lastRun, p = function(p) {
            if($window.devicePixelRatio) {
                return p * $window.devicePixelRatio;
            }
        };

        var lat, lon, watchOptions = {
            frequency : 1000,
            timeout : 3000,
            enableHighAccuracy: true // may cause errors if true
        };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
            null,
            function(err) {
                // error
            },
            function(position) {
                lat  = position.coords.latitude
                long = position.coords.longitude
            }
        );

        (function draw() {
            if(!(canvas && ctx)) {
                if($scope.canvas) {
                    canvas = $scope.canvas; // canvas gets injected
                    ctx = canvas.getContext('2d');
                } else {
                    $timeout(draw, 200); // wait injection
                    return;
                }
            }

            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var radius = p(5);

            ctx.clearRect(p(0), p(0), canvas.width, canvas.height);

            ctx.beginPath();
            ctx.moveTo(p(0), canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.lineWidth = p(1);
            ctx.strokeStyle = '#003300';
            ctx.stroke();
            ctx.closePath();

            var delta = (new Date().getTime() - lastRun)/1000;
            lastRun = new Date().getTime();
            fps = 1/delta;

            fps = Math.round(fps);

            if(fps < 100) {
                fps = "0" + fps;
            } else {
                fps = fps.toString();
            }

            ctx.fillStyle = "Black";
            ctx.font      = "normal " + p(16) + "pt Arial";

            ctx.fillText(Math.round(fps) + " fps", p(10), p(26));

            if(lat && long) {
                ctx.fillText('lat: ' + lat, p(10), canvas.height - p(46));
                ctx.fillText('long: ' + long, p(10), canvas.height - p(26));
            }

            $window.requestAnimationFrame(draw);
        }());
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
