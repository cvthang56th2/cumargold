$('#wrap-banner-slide').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    swipe: false,
    dotsClass: "banner-slide-dots"
});

$('#partner-slide').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    swipe: false
});

// Back to top button
// Check distance to top and display back-to-top.
$(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
        $('.back-to-top').addClass('show-back-to-top');
    } else {
        $('.back-to-top').removeClass('show-back-to-top');
    }
});

// Click event to scroll to top.
$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
    return false;
});