$(function() {
   showNavToggle();

	$('#sidebar').on('show.bs.offcanvas', function (e) {
      if ($('#sidefilter').hasClass('hide') || !$('#sidefilter').length) {
         $('#sidebar').css('display', '');
			$('#sidebar').toggleClass('hide');
		} else {
         e.preventDefault();
      }
	});

	$('#sidebar').on('hidden.bs.offcanvas', function (e) {
      $('#sidebar').toggleClass('hide');
	});

   $(window).on({
      'touchmove': function(e) {
          showNavToggle();
      }
   });

   $(window).scroll(function() {
      showNavToggle();
   });

   $(window).resize(function() {
      showNavToggle();
      resetView();
   });

});

function showNavToggle() {
   var width = $(window).width();
   if (width < 768) {
      var scrollTop = $(window).scrollTop();
      var offset = $('#nav-mobile').height() + $('.carousel').height();
      if (scrollTop > offset) {
         $('#nav-mobile-scroll').css({'display':'-webkit-flex'});
      } else {
         $('#nav-mobile-scroll').css('display', 'none');
      }
   } else {
      $('#nav-mobile-scroll').css('display', 'none');
      $('#sidebar').css('display', 'none');
   }
}

function resetView() {
	if ($(window).width() > 768) {
      if (!$('#sidefilter').hasClass('hide')) {
         $('#sidefilter').offcanvas('hide');
         $('#sidefilter').removeClass('in');
      }
      if (!$('#sidebar').hasClass('hide')) {
   		$('#sidebar').offcanvas('hide');
   		$('#sidebar').removeClass('in');
      }
	}
}
