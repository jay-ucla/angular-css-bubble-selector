app.controller('demoController',['$timeout','$scope','$state',
    function($timeout, $scope, $state,appUser){
        //Welcome Message
        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            angular.element('html').addClass('ismobile');
        }
        this.layoutType = 1;
        // For Mainmenu Active Class
        this.$state = $state;
        //Skin Switch
        this.sidebarToggle = {
            left: false
        }
    }]
);
