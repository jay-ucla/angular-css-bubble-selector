var app = angular.module('demoApp',[
    'ui.router',
    'ngAnimate',
	'bubbleLib'
]);

app.config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
    $urlRouterProvider.otherwise("/home");

	$stateProvider

    //------------------------------
    // HOME
    //------------------------------
        .state ('home', {
            url:'/home',
            views:{
                'content@':{
                    template:'<div class="row"><div class="col-md-8"><div class="card p-20">Click button on sidebar to activate bubble demo</div></div></div>',
                }
            }
        })
	//Selection states

        .state('demo',{
            url:'/demo?limit&next',
            views:{
                'bdModal@':{
                    template:'<div data-bubble-grid="values" data-bg-field-name="{{field}}" data-bg-callback="selectVal(val)" data-bg-title="Choose a number" data-bubble-style="customStyle"></div>',
                    resolve:{
                        values:function($stateParams){
							//resolve data for bubble-grid
                            return Array.from(Array(parseInt($stateParams.limit)).keys()).map(function(x){return {id:x+1,name:x+1}});
                        }
                    },
                    controller:function(values,$scope,$stateParams,$state){
                        $scope.values=values;
						$scope.field = "name";
                        $scope.customStyle={'margin-bottom':'0px'};
                        if($stateParams.next)
                        {
							//get data for next state
                            $scope.nextState=$stateParams.next;
                        }

						//call back for bubble grid button
                        $scope.selectVal=function(val){
                            if(!val)
                            {
								//if no value is selected
                                $state.go('home');
                            }
                            else
                            {
								//if value is selected, go to next state
      							if(angular.isDefined($scope.nextState))
                                    $state.go($scope.nextState,{selected: val});
                                else
                                    $state.go('home');
                            }

                        };
                    }
                }
            }
        });
});
