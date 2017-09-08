$(function() {
   carouselResponsive();

   $(window).scroll(function() {
      var height = $(window).height();
      var width = $(window).width();
      var navHeight = $('#nav-desktop').height();
      if (width < 768) {
         navHeight = $('#nav-mobile').height();
      }
      var scrollTop = $(window).scrollTop();
      var carouselHeight = height - navHeight;

      if (scrollTop > navHeight && scrollTop < (navHeight + carouselHeight)) {
         var speed = $('.parallax').data("speed");
         var scrolledHeight = scrollTop - navHeight;
         var translateY = scrolledHeight*(1-speed);
         $(".parallax").css("transform", ("translate3d(0," + translateY + "px,0)"));
      } else {
         $(".parallax").css("transform", ("translate3d(0,0,0)"));
      }
   });

   $(window).resize(function() {
      carouselResponsive();
   });

   $("#showcase").swipe( {
		//Generic swipe handler for all directions
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
         $(this).carousel('next');
		},
		swipeRight: function() {
			$(this).carousel('prev');
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold:75
	});

   $('#showcase').carousel({
      pause: "false"
   });
});

function carouselResponsive() {
   var height = $(window).height();
   var width = $(window).width();
   var navHeight = $('#nav-desktop').height();
   if (width < 768) {
      navHeight = $('#nav-mobile').height();
   }
   var setHeight = height - navHeight;
   $('#showcase').height(setHeight);
   $('#showcase .carousel-img').height(setHeight);
   $('#showcase .carousel-img').width($(document).width());
}
