window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("goToTop").style.display = "block";
  } else {
    document.getElementById("goToTop").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$(window).on(
    'load resize orientationchange',
    normalizeSlideHeights);

function normalizeSlideHeights() {
  $('.carousel').each(function(){
    var items = $('.carousel-item', this);
    items.css('min-height', 0);
    var maxHeight = Math.max.apply(null,
      items.map(function(){
        return $(this).outerHeight()}).get() );
    items.css('min-height', maxHeight + 'px');
  })
}

// if ($(window).width() < 960) {
//    alert('Less than 960');
// }
// else {
//    alert('More than 960');
// }
