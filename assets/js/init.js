/** *************Init JS*********************
	
    TABLE OF CONTENTS
	---------------------------
	1. Preloader
	2. Ready Function
	   a) Auto height for the home page
	   b) Smooth Scroll
	   c) 3d gallery
	   d) Vimeo Video
	   e) Schedule Accordian
	   f) Speaker Slider
	   g) Animation
	   h) Registration Form
	   i) Subscribe
	   j) Nice Scroll
	   h) Placeholder for ie9
	3.Landing Slider Js

/*************************************/

/* "use strict";*/

/*************************************/
/* Preloader */
/**************************************/
jQuery(window).load(function() {
        // will first fade out the loading animation
	jQuery(".status").fadeOut();
        // will fade out the whole DIV that covers the website.
	jQuery(".preloader").delay(100).fadeOut("slow");
	jQuery("body").css('overflow-y','visible');

});



/*************************************/
/* Ready Function */
/**************************************/
	
jQuery( document ).ready(function( $ ) {
	$.noConflict();
	
	/*** Auto height function ***/
	var setElementHeight = function () {
		var height = $(window).height();
		$('.autoheight').css('min-height', (height));
		
	};

	$(window).on("resize", function () {
		setElementHeight();
	}).resize();


	
	/*******Smooth scroll***********/
	var height=$(".navbar.navbar-default").height();
	var scroll = $(window).scrollTop();
	if (scroll > height) {
		$(".header-hide").addClass("scroll-header");
	}
	
	smoothScroll.init({
		speed: 1000,
		easing: 'easeInOutCubic',
		offset: height,
		updateURL: false,
		callbackBefore: function ( toggle, anchor ) {},
		callbackAfter: function ( toggle, anchor ) {},
	});
	
	$(window).scroll(function() {
		var height = $(window).height();
		var scroll = $(window).scrollTop();
		if (scroll) {
			$(".header-hide").addClass("scroll-header");
		} else {
			 $(".header-hide").removeClass("scroll-header");
		}
	
	});
	
	/*** 3D Gallery *********/
	new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
	// new CBPFWTabs( document.getElementById( 'tabs-ui' ) );
	
	/********Vimeo Video*****************/
	$('.venobox').venobox({
		numeratio: true,
		infinigall: true,
		border: '20px'
	});
	$('.venoboxvid').venobox({
		bgcolor: '#000'
	});
	$('.venoboxframe').venobox({
		border: '6px'
	});
	$('.venoboxinline').venobox({
		framewidth: '300px',
		frameheight: '250px',
		border: '6px',
		bgcolor: '#f46f00'
	});
	$('.venoboxajax').venobox({
		border: '30px;',
		frameheight: '220px'
	});	
		
		
	/*******Schedule Accordion *************/
	
	/*$('.accordion .item .heading').click(function() {		
	var a = $(this).closest('.item');
	var b = $(a).hasClass('open');
	var c = $(a).closest('.accordion').find('.open');
		
	if(b != true) {
		$(c).find('.content').slideUp(500);
		$(c).removeClass('open');
	}

	$(a).toggleClass('open');
	$(a).find('.content').slideToggle(500);

	});

	$('.nav_slide_button').click(function() {
	$('.pull').slideToggle();
	});	*/
		
	/******* Speakers Slider *************/
		
	$('#portfolioSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: false,
		pauseOnHover: true,

	});

	$('#servicesSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,

	});

	$('#teamSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,

	});
	
	/* Overlay */
	if (Modernizr.touch) {
	// show the close overlay button
	$(".close-overlay").removeClass("hidden");
	// handle the adding of hover class when clicked
	$(".img").click(function(e){
		if (!$(this).hasClass("hover")) {
			$(this).addClass("hover");
		}
	});
	// handle the closing of the overlay
	$(".close-overlay").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		if ($(this).closest(".img").hasClass("hover")) {
			$(this).closest(".img").removeClass("hover");
		}
	});
	} else {
		// handle the mouseenter functionality
		$(".img").mouseenter(function(){
			$(this).addClass("hover");
		})
		// handle the mouseleave functionality
		.mouseleave(function(){
			$(this).removeClass("hover");
		});
	}
	
	/***************** Animation ******************/
	var wow = new WOW(
	{
	boxClass: 'wow', // animated element css class (default is wow)
	animateClass: 'animated', // animation css class (default is animated)
	offset: 0, // distance to the element when triggering the animation (default is 0)
	mobile: false, // trigger animations on mobile devices (default is true)
	live: true // act on asynchronously loaded content (default is true)
	}
	);
	
	wow.init();
		
	/** Registration Form **/
	$("#submit_btn").click(function() 
	{ 

		var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		var e = document.getElementById("field_1");
		var user_type = e.options[e.selectedIndex].text;
		
	
		var person_name = document.getElementById("name").value;
		var user_email = document.getElementById("email1").value;
		
		var proceed = true;
		
		
		if(person_name == ""){ 
			var error1 = '<div class="enter-name col-lg-3 align-center"> Enter the name </div>';
			jQuery("#result").hide().html(error1).fadeIn(500);
			proceed = false;
			return false;
		}
		
		if(user_email== ""){
			var error2 = '<div class="enter-email col-lg-3 align-center"> Enter the email </div>';
			jQuery("#result").hide().html(error2).fadeIn(500);
			proceed = false;
			
		}
		else if(!filter.test(user_email)) {
			var invalid = '<div class="invalid-email col-lg-3 align-center"> Invalid Email </div>';
			jQuery("#result").hide().html(invalid).fadeIn(500);
			proceed = false;
			
		}
	
		if (proceed) //everything looks good! proceed...
		{
			
			//data to be sent to server
			var post_data = {
				'userName': person_name,
				'userType': user_type,
				'userEmail': user_email,

			}
			
			//Ajax post data to server
			jQuery.post('contact_me.php', post_data, function(response) {
				//load json data from server and output message
				if (response.type == 'error') {
					var output = '<div class="error col-lg-3 align-center">' + response.text + '</div>';
				} else {
					var output = '<div class="success col-lg-3 align-center">' + response.text + '</div>';
					//reset values in all input fields
					
				}
				jQuery("#result").hide().html(output).fadeIn(500);
				
			}, 'json');
		}

		return false;
 
	});
		
	/** Subscribe JS **/
	$("#notifyMe").notifyMe(); // Activate notifyMe plugin on a '#notifyMe' element 


	/*** Overlay close*********/
	$('.md-overlay').click(function(e){
		$("#modal-10").removeClass("md-show");
		$("#modal-11").removeClass("md-show");
	});
		
	/**********Menu Close Logic***************/

	$('.navbar-collapse.in').niceScroll({cursorcolor:"#c8bd9f"});
		$('.nav li a').click(function(){
			$('.navbar-collapse.collapse').toggleClass('in');
	});	
	
	 /******* Nice Scroll *******/

	 $("html").niceScroll();
	 
	 /** Placeholder JS call **/
	$('input[type=text], textarea').placeholder();	
	
});
/*************************************/
/* Landing Slider Js */
/**************************************/

	var $slides = $('#slides');

	Hammer($slides[0]).on("swipeleft", function(e) {
	$slides.data('superslides').animate('next');
	});

	Hammer($slides[0]).on("swiperight", function(e) {
	$slides.data('superslides').animate('prev');
	});

	$slides.superslides({
	hashchange: false
	});
	$(".home-bg").swiperight(function() {  
	$slides.data('superslides').animate('prev');		  
	});  
	$(".home-bg").swipeleft(function() {  
	$slides.data('superslides').animate('next'); 
	});  
	$(".landing-text-pos").swiperight(function() {  
	$slides.data('superslides').animate('prev');		  
	});  
	$(".landing-text-pos").swipeleft(function() {  
	$slides.data('superslides').animate('next'); 
	});  

//Countdown
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = "Feb 01 2020 14:00:00 GMT+0530";
initializeClock('clockdiv', deadline);