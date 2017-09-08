var product;
$(function() {
	filterResponsive();

	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		var navHeight = $('#nav-desktop').height();
		if (scrollTop < navHeight) {
			$('#category, #filter').css('transform', ("translate3d(0," + -scrollTop + "px,0)"));
			$('#category, #filter').removeClass('top');
		} else {
			$('#category, #filter').css('transform', ("translate3d(0, 0, 0)"));
			$('#category, #filter').addClass('top')
		}
	});

	$(window).scroll(function() {
		filterResponsive();
	});

	$(window).resize(function() {
		filterResponsive();
	});

	$('.thumbnail').click(function() {
		var productJSON = $('meta', this).attr('content');
		product = JSON.parse(productJSON);
		var actived = false;
		var i;

		$("#quantity").val(1);

		$('.btn-group-selection').empty();

		for (i = 0; i < product.length; i++) {
			if (!actived) {
				$('.btn-group-selection').append('<div class="btn-group" role="group">' +
																'<button type="button" class="btn btn-sm btn-selection active" content="'+ i +'">'+ product[i].name +'</button>' +
															'</div>');
				actived =true;
			} else {
				$('.btn-group-selection').append('<div class="btn-group" role="group">' +
																'<button type="button" class="btn btn-sm btn-selection" content="'+ i +'">'+ product[i].name +'</button>' +
															'</div>');
			}
		}

		// Initialize product showcase
		$('.carousel-inner').empty();
		for (i = 0; i < product[0].productImgs.length; i++) {
			$('.carousel-inner').append('<div class="item active">' +
													'<div class="product-carousel-img" style="background: url('+ product[0].productImgs[i] +');"></div>' +
												'</div>')
		}

		// Refresh product showcase when selection is made
		$('.btn-selection').click(function() {
			if (!$(this).hasClass('active')) {
				$('.btn-selection').removeClass('active');
				$(this).toggleClass('active');
				var productImgs = product[$(this).attr('content')].productImgs;
				$('.carousel-inner').empty();
				for (i = 0; i < productImgs.length; i++) {
					$('.carousel-inner').append('<div class="item active">' +
						'<div class="product-carousel-img" style="background: url('+ productImgs[i] +');"></div>' +
					'</div>')
				}
			}
		});
	});

	$('#product-showcase').carousel({
		interval:false
	});

	$('.btn-category').click(function() {
		if (!$(this).hasClass('active')) {
			$('.btn-category').removeClass('active');
			var cls='.btn-category-' + $(this).attr('id');
			$(cls).toggleClass('active');
		}
	});

	$('.btn-sort').click(function() {
		if (!$(this).hasClass('active')) {
			$('.btn-sort').removeClass('active');
			var cls='.btn-sort-' + $(this).attr('id');
			$(cls).toggleClass('active');
		}
	});

	$('.btn-order').click(function() {
		if (!$(this).hasClass('active')) {
			$('.btn-order').removeClass('active');
			var cls='.btn-order-' + $(this).attr('id');
			$(cls).toggleClass('active');
		}
	});

	$('#quantity-minus').click(function() {
		$('#quantity').val(Math.max(0, parseInt($('#quantity').val())-1));
	});

	$('#quantity-plus').click(function() {
		$('#quantity').val(parseInt($('#quantity').val())+1);
	});

	$('#sidefilter').on('show.bs.offcanvas', function(e) {
		if ($('#sidebar').hasClass('hide')) {
			$('#sidefilter').toggleClass('hide');
		} else {
			e.preventDefault();
		}
	});

	$('#sidefilter').on('hidden.bs.offcanvas', function() {
		$('#sidefilter').css('display', '');
		$('#sidefilter').toggleClass('hide');
	});

	$('#nav-mobile-button, #nav-mobile-scroll-button').click(function () {
		if ($('#sidebar').hasClass('hide')) {
			if (!$('#sidefilter').hasClass('hide')) {
				$('#sidefilter').offcanvas('hide');
				$('#sidefilter').removeClass('in');
			}
			$('#nav-mobile-button').trigger('click');
		}
	});

	$('#productDetail').on('hide.bs.modal', function () {

	});


});

function filterResponsive() {
	var height = $(window).height();
	var footerHeight = $('footer').outerHeight();
	var navHeight = $('#nav-desktop').height();
	var categoryHeight = $('#category').outerHeight();
	var scrollTop = $(window).scrollTop();
	var documentHeight = $(document).height();
	if ((documentHeight - scrollTop - height) > footerHeight && scrollTop < navHeight) {
		$('#filter').outerHeight(height - categoryHeight - navHeight + scrollTop - 20);
	} else if ((documentHeight - scrollTop - height) > footerHeight && scrollTop > navHeight) {
		$('#filter').outerHeight(height - categoryHeight - 20);
	} else {
		$('#filter').outerHeight(height - categoryHeight - (footerHeight - (documentHeight - scrollTop - height)) - 20);
	}
}
