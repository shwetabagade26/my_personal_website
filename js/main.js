(function ($) {
    "use strict";

    /*---------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */
    $(window).on("load", function () {
        $("#loader").fadeOut("fast", function () {
            $("#preloader").delay(30).fadeOut("fast");
        });
    });

    /*---------------------------------------------------- */
    /* FitText Settings
    ------------------------------------------------------ */
    $(document).ready(function () {
        $('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });
    });

    /*---------------------------------------------------- */
    /* FitVids
    ------------------------------------------------------ */
    $(".fluid-video-wrapper").fitVids();

    /*---------------------------------------------------- */
    /* Owl Carousel
    ------------------------------------------------------ */
    $("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        responsive: {
            0: { items: 1 },
            700: { items: 2 },
            960: { items: 3 }
        },
        navigationText: false
    });

    /*----------------------------------------------------- */
    /* Alert Boxes
    ------------------------------------------------------- */
    $('.alert-box').on('click', '.close', function () {
        $(this).parent().fadeOut(500);
    });

    /*----------------------------------------------------- */
    /* Stat Counter
    ------------------------------------------------------- */
    var stats = $(".stat-count");
    $("#stats").one("waypoint", function (direction) {
        if (direction === "down") {
            stats.each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function (curValue) {
                        $this.text(Math.ceil(curValue));
                    }
                });
            });
        }
    }, { offset: "90%" });

    /*---------------------------------------------------- */
    /* Masonry
    ------------------------------------------------------ */
    var containerProjects = $('#folio-wrapper');
    containerProjects.imagesLoaded(function () {
        containerProjects.masonry({
            itemSelector: '.folio-item',
            percentPosition: true
        });
    });

    /*----------------------------------------------------*/
    /* Modal Popup
    ------------------------------------------------------*/
    $('.item-wrap a').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        removalDelay: 300,
        showCloseBtn: false,
        mainClass: 'mfp-fade'
    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    /*-----------------------------------------------------*/
    /* Navigation Menu
    ------------------------------------------------------ */
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation');

    toggleButton.on('click', function (e) {
        e.preventDefault();
        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
    });

    nav.find('li a').on("click", function () {
        toggleButton.toggleClass('is-clicked');
        nav.fadeOut();
    });

    /*---------------------------------------------------- */
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------ */
    var sections = $("section"),
        navigation_links = $("#main-nav-wrap li a");

    sections.waypoint({
        handler: function (direction) {
            var active_section = $('section#' + this.element.id);
            if (direction === "up") active_section = active_section.prev();
            var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');
            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");
        },
        offset: '25%'
    });

    /*---------------------------------------------------- */
    /* Smooth Scrolling
    ------------------------------------------------------ */
    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
    });

    /*---------------------------------------------------- */
    /* Placeholder Plugin Settings
    ------------------------------------------------------ */
    $('input, textarea, select').placeholder();

    /*---------------------------------------------------- */
    /* Contact Form
    ------------------------------------------------------ */
    $('#contactForm').validate({
        submitHandler: function (form) {
            var sLoader = $('#submit-loader');
            $.ajax({
                type: "POST",
                url: "inc/sendEmail.php",
                data: $(form).serialize(),
                beforeSend: function () { sLoader.fadeIn(); },
                success: function (msg) {
                    if (msg === 'OK') {
                        sLoader.fadeOut();
                        $('#message-warning').hide();
                        $('#contactForm').fadeOut();
                        $('#message-success').fadeIn();
                    } else {
                        sLoader.fadeOut();
                        $('#message-warning').html(msg).fadeIn();
                    }
                },
                error: function () {
                    sLoader.fadeOut();
                    $('#message-warning').html("Something went wrong. Please try again.").fadeIn();
                }
            });
        }
    });

    /*----------------------------------------------------- */
    /* Back to top
    ------------------------------------------------------- */
    var pxShow = 300, fadeInTime = 400, fadeOutTime = 400;

    function debounce(func, wait = 50) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    $(window).scroll(debounce(function () {
        if (!$("#header-search").hasClass('is-visible')) {
            if ($(window).scrollTop() >= pxShow) {
                $("#go-top").fadeIn(fadeInTime);
            } else {
                $("#go-top").fadeOut(fadeOutTime);
            }
        }
    }, 100));

})(jQuery);
