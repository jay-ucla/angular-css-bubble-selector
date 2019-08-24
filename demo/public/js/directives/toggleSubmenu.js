app.directive('toggleSubmenu', function(){
        return {
            restrict: 'A',
			scope:{
				'toggled':'=toggleSubmenu'
			},
            link: function(scope, element, attrs) {
				if(scope.toggled!=true){
					if((style=element.next().attr('style')))
                    	element.next().attr('style',style+';'+'display:none');
                	else
                    	element.next().attr('style','display:none');
				}
                else{
					element.parent().toggleClass('toggled');
				}
				element.bind('click',function(){
                    element.next().slideToggle(200);
                    element.parent().toggleClass('toggled');
                });
            }
        }
    });

