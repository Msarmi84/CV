/*
1. timing Function
2. carousels
  2-1. home page subtitle carousel
  2-2. testimonials carousel
  2-3. news carousel
  2-3. about section images carousel
3. scrollTo
4. scrollToTop
5. preloader
6. parallax
7. facts counter
8. home fadeOut animation
9. contact form
10. YTPlayer
11. skills bar
12. menu active state
13. navigation - style #3
  13-1. height.Adjustment
  13-2. search form
  13-3. search form additional CLOSER
14. google maps POSITION
15. GOOGLE ANALYTICS [for demonstration purposes only]
16. the Wall
*/


$(function() {
    "use strict";
	
	
    // 1. timing Function
    var timingFunction = "easeInOutQuart";
	
    // 2. carousels
    // 2-1. home page subtitle carousel
    $(".home-page-subtitle-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        center: true,
        dots: false,
        nav: false,
        touchDrag: false,
        mouseDrag: false,
        pullDrag: false,
        responsiveRefreshRate: 50
    });
    // 2-2. testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        center: true,
        dots: false,
        nav: false,
        touchDrag: true,
        mouseDrag: true,
        pullDrag: true,
        responsiveRefreshRate: 50
    });
    // 2-3. news carousel
    $(".news-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        items: 1,
        margin: 0,
        center: true,
        dots: false,
        nav: true,
        touchDrag: true,
        mouseDrag: true,
        pullDrag: true,
        responsiveRefreshRate: 50,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
        autoplayHoverPause: true
    });
    // 2-4. about section images carousel
    $(window).on("resize", function() {
        if ($(window).width() < 1024) {
            $(".about-section-images-carousel").owlCarousel({
                loop: true,
                autoplay: true,
                autoplaySpeed: 1000,
                autoplayTimeout: 5000,
                items: 1,
                margin: 0,
                center: true,
                dots: false,
                nav: true,
                touchDrag: true,
                mouseDrag: true,
                pullDrag: true,
                responsiveRefreshRate: 50,
                navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
            });
        } else {
            $(".about-section-images-carousel").trigger("destroy.owl.carousel");
        }
    }).trigger("resize");
	
    // 3. scrollTo
    $("[data-scroll-to]").on("click", function(e) {
        e.preventDefault();
        var scroll_element = "#" + $(this).data("scroll-to");
        var scrollOffset = $(scroll_element).offset().top;
        $("html, body").animate({
            scrollTop: scrollOffset
        }, 1400, timingFunction);
    });
	
    // 4. scrollToTop
    $(".scrollToTop").on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1400, timingFunction);
    });
	
    $(window).on("load", function() {
        // 5. preloader
        $("#preloader").delay(400).fadeOut(400, timingFunction);
    });
	
    // 6. parallax
    $(".parallax-window").parallax(10);
	
    // 7. facts counter
    $(".facts-counter-number").appear(function() {
        var count  = $(this);
        var symbol = count.data("symbol");
        var to     = count.data("to") !== undefined
                   ? parseFloat(count.data("to"))
                   : parseFloat($.trim(count.text()));
    
        if (isNaN(to)) { return; }
    
        count.countTo({
            from: 0,
            to: to,
            speed: 1200,
            refreshInterval: 60,
            onComplete: function() {
                if (symbol) { count.html(symbol); }
            }
        });
    });
	
    // 8. home fadeOut animation
    $(window).on("scroll", function() {
        $("h1.home-page-title, h2.home-page-title, h3.home-page-title, .home-page-subtitle-text, .play-video-btn").css("opacity", 1 - $(window).scrollTop() / $(".hero-fullscreen, #viewport").height());
    });
    // 9. contact form
    $("form#form").on("submit", function() {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                    "inputError"), s = !0;
                else if ($(this).hasClass("email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                        "inputError"), s = !0);
                }
            }), !s) {
            $("form#form input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#form").slideUp("fast", function() {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
	
    
    // 11. skills bar
    $(".show-skillbar").appear(function() {
        $(".skillbar").skillBars({
            from: 0,
            speed: 4000,
            interval: 100,
            decimals: 0
        });
    });
	
    // 12. menu active state
    $(".menu-state, .link-underline").on("click", function() {
        $(".menu-state, .link-underline").removeClass("active");
        $(this).addClass("active");
    });
	
    // 13. navigation - style #3
    if ($(".main-navigation").hasClass("transparent")) {
        $(".main-navigation").addClass("js-transparent");
    }
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 10) {
            $(".js-transparent").removeClass("transparent");
            $(".main-navigation, .main-navigation-logo .main-navigation-logo-img").addClass("reduce-height");
        } else {
            $(".js-transparent").addClass("transparent");
            $(".main-navigation, .main-navigation-logo .main-navigation-logo-img").removeClass("reduce-height");
        }
    });
    // 13-1. height.Adjustment
    function heightAdjustment(heightSecondary, heightPrimary) {
        heightSecondary.height(heightPrimary.height());
        heightSecondary.css({
            "line-height": heightPrimary.height() + "px"
        });
    }
    heightAdjustment($(".main-inner-navigation > ul > li > a"), $(".main-navigation"));
    // 13-2. search form
    $(".search-modal-launcher").on("click", function() {
        if ($(".search-modal").hasClass("open")) {
            $(".search-modal").removeClass("open");
            $(".search-modal").addClass("close");
        } else {
            $(".search-modal").removeClass("close");
            $(".search-modal").addClass("open");
        }
    });
    // 13-3. search form additional CLOSER
    $(".main-navigation-logo, .link-underline").on("click", function() {
        $(".search-modal").removeClass("open");
        $(".search-modal").addClass("close");
    });
	
    
});


// 15. GOOGLE ANALYTICS [for demonstration purposes only]
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-3033286-18', 'auto');
ga('send', 'pageview');


// 16. the Wall
window.addEvent("domready", function() {
    var imagewall = [
        ["the-wall/1.jpg", [
            ["the-wall/1-2.jpg"]
        ]],
        ["the-wall/2.jpg", [
            ["the-wall/2-2.jpg"]
        ]],
        ["the-wall/3.jpg", [
            ["the-wall/3-2.jpg"]
        ]],
        ["the-wall/4.jpg", [
            ["the-wall/4-2.jpg"]
        ]],
        ["the-wall/5.jpg", [
            ["the-wall/5-2.jpg"]
        ]],
        ["the-wall/6.jpg", [
            ["the-wall/6-2.jpg"]
        ]],
        ["the-wall/7.jpg", [
            ["the-wall/7-2.jpg"]
        ]],
        ["the-wall/8.jpg", [
            ["the-wall/8-2.jpg"]
        ]],
        ["the-wall/9.jpg", [
            ["the-wall/9-2.jpg"]
        ]],
        ["the-wall/10.jpg", [
            ["the-wall/10-2.jpg"]
        ]],
        ["the-wall/11.jpg", [
            ["the-wall/11-2.jpg"]
        ]],
        ["the-wall/12.jpg", [
            ["the-wall/12-2.jpg"]
        ]],
        ["the-wall/13.jpg", [
            ["the-wall/13-2.jpg"]
        ]],
        ["the-wall/14.jpg", [
            ["the-wall/14-2.jpg"]
        ]],
        ["the-wall/15.jpg", [
            ["the-wall/15-2.jpg"]
        ]],
        
    ];
    var maxLength = imagewall.length;
    var wallFluid = new Wall("wall", {
        "draggable": true,
        "slideshow": true, // options: true, false
        "speed": 1000,
        "showDuration": 4000,
        "transition": Fx.Transitions.Quad.easeOut,
        "inertia": true,
        "autoposition": true,
        "width": 301,
        "height": 320,
        "rangex": [-100, 100],
        "rangey": [-100, 100],
        callOnUpdate: function(items) {
            var root = Math.ceil(Math.sqrt(maxLength));
            document.id("wall").setStyle("margin-left", 0);
            var i = 0;
            (function() {
                try {
                    var position = ((Math.abs(items[i].y) % root) * root) + (Math.abs(items[i].x) % root);
                    if (position >= maxLength) {
                        position = position % maxLength;
                    }
                    var file = imagewall[position][0];
                    var img = new Element("img[src=" + file + "]");
                    img.inject(items[i].node).fade("hide").fade("in");
                    i++;
                    if (i < items.length) {
                        var tmp = arguments.callee;
                        (function() {
                            tmp();
                        }).delay(10);
                    } else {}
                } catch (e) {}
            })();
        }
    });
    window.setTimeout(function() {
        wallFluid.initWall();
    }, 500);
});
// 17. Lightbox: videos in Works / images in Hobby
(function () {

    var VIDEO_FOLDER = 'videos/';
    var VIDEO_EXT    = '.mp4';
    var PLUS_SELECTOR = 'a.iw-slide-right.fa.fa-plus';
    // Sections where the "+" icon opens the IMAGE (PhotoSwipe) instead of a video.
    // To add more: '#hobby, #another-section'
    var IMAGE_SECTIONS = '#hobby';

    var box   = null;
    var video = null;

    // The #video-lightbox div sits AFTER this script in the HTML,
    // so we look it up the first time it is actually needed.
    function cacheNodes() {
        if (video) return true;
        box   = document.getElementById('video-lightbox');
        video = box ? box.querySelector('video') : null;
        return !!video;
    }

    function getVideoPath(link) {
        var fig = link.closest('figure') || link.parentElement;
        var manual = link.getAttribute('data-video') ||
                     (fig && fig.getAttribute && fig.getAttribute('data-video'));
        if (manual) return manual;
        var img = fig && fig.querySelector ? fig.querySelector('img') : null;
        var m = img && (img.getAttribute('src') || '').match(/(\d+)\.\w+$/);
        return m ? VIDEO_FOLDER + m[1] + VIDEO_EXT : null;
    }

    function openVideo(src) {
        if (!cacheNodes()) return;
        video.src = src;
        box.classList.add('is-open');
        box.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
    }

    function closeVideo() {
        if (!video) return;
        video.pause();
        video.removeAttribute('src');
        video.load();
        box.classList.remove('is-open');
        box.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Forward the click to the image link so PhotoSwipe handles it
    function openImage(link) {
        var fig = link.closest('figure');
        var imageLink = fig ? fig.querySelector('a.effect-bubba-photos') : null;
        if (imageLink) imageLink.click();
    }

    document.addEventListener('click', function (e) {
        var link = e.target.closest ? e.target.closest(PLUS_SELECTOR) : null;
        if (!link) return;

        // --- Hobby: images ---
        if (link.closest(IMAGE_SECTIONS)) {
            e.preventDefault();
            e.stopPropagation();
            openImage(link);
            return;
        }

        // --- Works: videos ---
        var src = getVideoPath(link);
        if (!src) return;
        e.preventDefault();
        e.stopPropagation();
        openVideo(src);
    }, true);

    document.addEventListener('click', function (e) {
        if (!box || !box.classList.contains('is-open')) return;
        if (e.target === box || (e.target.classList && e.target.classList.contains('vl-close'))) closeVideo();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && box && box.classList.contains('is-open')) closeVideo();
    });

})();