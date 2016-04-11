app.directive("activeLink", function() {
    return {
        scope: {},
        restrict: "C",
        link: function(scope, element, attrs){
        //USING JQLITE (i.e. INBUILT ANGULAR JQUERY)
          var link = angular.element(element.children());
          link.bind("click", function(e){
            link.removeClass("active");
            var $this = $(this);
            if(!$this.hasClass("active")){
              $this.addClass("active");
            }
          });
        }
        /*  USING JQUERY
        $('li').click(function(e) {
          $('li.active').removeClass('active');
          var $this = $(this);
          if (!$this.hasClass('active')) {
              $this.addClass('active');
          }
        });
        */
    };
});
