$('#wrap-banner-slide').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    swipe: false,
    dotsClass: "banner-slide-dots",
    arrows: false
});

$('#partner-slide').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    swipe: false
});

$('.custom-feeling-slide').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: '<button type="button" class="custom-feeling-slide-prev-btn"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button type="button" class="custom-feeling-slide-next-btn"><i class="fas fa-angle-right"></i></button>'
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

$('#advertisement').slick({
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false
});

$('#expert-opinions').slick({
    autoplay: true,
    autoplaySpeed: 1000
});

$('.count').each(function () {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
            duration: 6000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
});