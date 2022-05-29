// Wyrównuje przestrzeń dla każdego slidera.
// Dzięki temu przy przeskakiwaniu pomiędzy slajdami w których jest różna ilość
// treści nie ma efektu kurczenia się strony.
// AKTUALNIE NIE WYMAGANE GDYŻ SLAJDAMI BĘDĄ ZDJĘCIA O TEJ SAMEJ WYSOKOŚCI
$(window).on(
  'load resize orientationchange',
  normalizeSlideHeights
);

function normalizeSlideHeights() {
  $('.carousel').each(function(){
    var items = $('.carousel-item', this);
    items.css('min-height', 0);
    var maxHeight = Math.max.apply(null,
      items.map(function(){
        return $(this).outerHeight()}).get() );
    items.css('min-height', maxHeight + 'px');
  })
};
