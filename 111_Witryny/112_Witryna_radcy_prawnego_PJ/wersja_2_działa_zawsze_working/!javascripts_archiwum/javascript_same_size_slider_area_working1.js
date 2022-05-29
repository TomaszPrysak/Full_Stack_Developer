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
