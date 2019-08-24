angular.module('bubbleLib',[])
	.service('colorsListService',function(){
	//service to generate random colors for bubbles
    var s={};
    s.skinList = [
        'lightblue',
        'cyan',
        'teal',
        'orange',
        'blue',
        'red'
    ];
    s.colorList=[
        'purple','deeppurple','indigo','lightgreen','amber','deeporange','green'
    ];
    s.light=['lightgreen','green','blue','teal','cyan','lightblue','purple','orange'];
    this.randomList=function(a){
        var arr;
        if(a=="light")
            arr= s.light;
        else
            arr=s.skinList.concat(s.colorList);
        var counter = arr.length;

        // While there are elements in the arr
        while (counter > 0) {
            // Pick a random index
            var index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            var temp = arr[counter];
            arr[counter] = arr[index];
            arr[index] = temp;
        }

        return arr;

    };
    this.getColorList=function(){
        return s.skinList;
    }
})
	.directive('bubbleGrid',function($state,colorsListService,$timeout){
    return {
       replace:true,
       restrict:'AE',
       scope:{
			//the array of options to be displayed
           'optionsList':'=bubbleGrid',
			//the callback on selection of an options
           'bgCallback':'&',
			//the key of the field to be displayed as the option name
           'bgFieldName':'@',
			//the title displayed in the circle
           'bgTitle':'@',
			//any optional style properties to be applied to each bubble
           'bubbleStyle':'='
       },
       template:'<div class="ajax-loader" style="overflow: scroll;top:70px;"><style>{{transform}}</style>' +
       '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
            '<defs><filter id="goo"><feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />' +
            '<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />'+
            '<feComposite in2="goo" in="SourceGraphic" result="mix" /></filter></defs></svg>' +
                    '<div style="width:565px;height:50%;margin:0px auto;position:relative;-webkit-filter: url(\'#goo\');filter: url(\'#goo\');">' +
                        '<div style="color:#222;font-size: 20px;px;position:absolute;left:37%;top:40%">{{bgTitle}}' +
                        '<button ng-click="selectOption()" class="btn btn-icon btn-danger goo-item" ' +
                            'style="line-height: 0;width:60px;height:60px;display: block;left: 35%;margin-top: 10%;">' +
                                '<i style="font-size:24px;" class="zmdi zmdi-close"></i></button></div>'+
                    '<button ng-repeat="o in optionsList" class="btn btn-icon btn-default col-xs-4 goo-item bg-animated" ng-class="\'bgm-\'+colors[$index]" ' +
                        'ng-style="bubbleStyling" ' +
                    'ng-click="selectOption(o)"><p ng-style="bubbleStyle">{{o[bgFieldName]}}</p></button>'+
                '</div></div>',
       link:function(scope,el,attr){
			//max elements in a circle
           var max_l=22;
           var length=scope.optionsList.length;

			//styling for each bubble
           scope.bubbleStyling={
               'width':'85px',
               'height':'85px',
               'font-size':'30px',
               'font-weight':'bolder',
               'position':'absolute',
               'top':'40%',
               'left':'45%',
               'box-shadow':'none'
           };
			//enforced to ensure bubbles appear in circle
           if(length<7)
            length=7;
            else if(length>max_l)
           {
				//reducing size of bubbles to fit into circle
               scope.bubbleStyling['width']='70px';
               scope.bubbleStyling['height']='70px';
               scope.bubbleStyling['font-size']='23px';
           }
           scope.colors=colorsListService.randomList();
           scope.ran=parseInt(Math.random()*100);
           while(length>scope.colors.length)
           {
				//keep adding colors to make sure the array is same size as bubbles
               scope.colors=scope.colors.concat(scope.colors);
           }
			//defining transitions for bubbles
           scope.transform=".goo-item{"+
               "-webkit-transition: -webkit-transform ease-out 600ms;"+
               "transition: -webkit-transform ease-out 600ms;"+
               "transition: transform ease-out 600ms;"+
               "transition: transform ease-out 600ms, -webkit-transform ease-out 600ms;} ";

           scope.buildAnimationClass=function(start,end){
				//calculating angles for each bubble and adding custom css for each
               var len=end-start+1;
               var angle=0;
               var step=360/len;

				//calculate how far the bubbles move
               var distance=7;
               var diff=12-len;
               distance=Math.ceil(distance-(diff/2));
               for(var i=start;i<=end;i++)
               {
                   scope.transform+=" .bg-animate"+scope.ran+":nth-child("+i+") {transform:rotate("+angle+"deg) translate(-"+distance+"em) rotate(-"+angle+"deg);}\n";
                   //scope.transform+=" #bg"+scope.ran+'n'+i+ " {transform:rotate("+angle+"deg) translate(-"+distance+"em) rotate(-"+angle+"deg);}\n";
                   angle+=step;
               }
           };
			//if all bubbles can't fit in a single circle, make concentric circles
           if(length>max_l){
               //draw first circle
               var group_step=9;
               var last_start=2;
               var last_end=max_l+1;
               var last_len=max_l;
               scope.buildAnimationClass(last_start,last_end);
               length=length-last_len;
               last_len=last_len-group_step;

				//keep adding circles inside the outer circle to accomodate all options
               while(length>0&&last_len>0)
               {
                   last_start=last_end+1;
                   last_end=last_end+last_len;
                   length=length-last_len;
                   if(last_len<=group_step)
                   last_len=7;
                   else
                   last_len=last_len-group_step;
                   scope.buildAnimationClass(last_start,last_end);
               }
           }
           else
           {
               scope.buildAnimationClass(2,length+1);
           }
			//animate the bubbles to reach circle from the center
           $timeout(function(){
               var arr=el[0].querySelectorAll(".bg-animated");
               angular.forEach(arr,function(val,key){
                   angular.element(val).addClass('bg-animate'+scope.ran);
               });
           },200);
       },
       controller:function($scope){

           /*
			//optional code for sorting options
           $scope.optionsList.sort(function(a,b){
               return a.sort_key< b.sort_key?-1:1;
                   //return a[$scope.bgFieldName]<b[$scope.bgFieldName];
           });*/
           $scope.selectOption=function(o){
               if(o)
               $scope.bgCallback({val:o});
               else
               $scope.bgCallback();
           }
       }
   }
});
