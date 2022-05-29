// Reakcja na otwarcie okna przeglądarki i każdorazową jej zmianę
$(document).ready(function(){
  updateContainer();
  $(window).resize(function(){
    updateContainer();
  });
});

// Zmiana wyglądu obszaru usług. Graniczna wartość to 768px szerokości okna przeglądarki (na co wpływa szerokość ekranu)
// Powyżej 768px usługi prezentowane są w postaci "menu bocznego"
// Poniżej 768px usługi prezentowane są w postaci "akordeonu"
function updateContainer() {
  var $containerHeight = $(window).width();
  if ($containerHeight < 768) {
    $("#uslugi_wiecej_niz_768_px").hide();
    $("#uslugi_mniej_niz_768_px").show();
  }
  if ($containerHeight > 768) {
    $("#uslugi_mniej_niz_768_px").hide();
    $("#uslugi_wiecej_niz_768_px").show();
  }
}

// Wyrównuje przestrzeń dla każdego slidera.
// Dzięki temu przy przeskakiwaniu pomiędzy slajdami w których jest różna ilość
// treści nie ma efektu kurczenia się strony.
// AKTUALNIE NIE WYMAGANE GDYŻ SLAJDAMI BĘDĄ ZDJĘCIA O TEJ SAMEJ WYSOKOŚCI
// $(window).on(
//   'load resize orientationchange',
//   normalizeSlideHeights
// );
//
// function normalizeSlideHeights() {
//   $('.carousel').each(function(){
//     var items = $('.carousel-item', this);
//     items.css('min-height', 0);
//     var maxHeight = Math.max.apply(null,
//       items.map(function(){
//         return $(this).outerHeight()}).get() );
//     items.css('min-height', maxHeight + 'px');
//   })
// };

// Wyświetlenie przycisków "Start" i "Kontakt" w momencie scrollowania w dół strony
window.onscroll = function(){
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("goToTop").style.display = "block";
    document.getElementById("goToDown").style.display = "block";
  } else {
    document.getElementById("goToTop").style.display = "none";
    document.getElementById("goToDown").style.display = "none";
  }
}

// Po naciśnięciu przycisku "Start" scrollowanie ekranu na początek, na samą górę strony
function topFunction() {
  // 1. sposób (nie działa na safari):
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;
  // 2. sopsó (działa wszędzie):
  $("html, body").animate({
      scrollTop: $("#start").offset().top
    }, 0, 'linear');
}

// Po naciśnięciu przycisku "Kontakt" scrollowanie ekranu na koniec, na sam dół strony
function downFunction() {
  // 1. sposób (nie działa na safari):
  // window.scrollTo(0, document.body.scrollHeight);
  // 2. sopsó (działa wszędzie):
  $("html, body").animate({
      scrollTop: $("#kontakt").offset().top - 100
    }, 0, 'linear');
}

// Obracanie ikonek ze strzałami w akordeonie usług (czyli tylko dla ekranów mniejszych niż 768px)
$(".accordionButton").click(function(){
  if (  $(this).children(".span_for_svg_uslugi_mniej_niz_768_px_in_button").children(".svg_uslugi_mniej_niz_768_px_in_button").hasClass("down") ) {
    $(this).children(".span_for_svg_uslugi_mniej_niz_768_px_in_button")
    .children(".svg_uslugi_mniej_niz_768_px_in_button")
    .toggleClass("down");
  } else {
    var svgQty = $(".svg_uslugi_mniej_niz_768_px_in_button").length;
    for (var i = 0; i < svgQty; i++) {
      if ($(".svg_uslugi_mniej_niz_768_px_in_button").eq(i).hasClass("down")) {
        $(".svg_uslugi_mniej_niz_768_px_in_button").eq(i).toggleClass("down");
      }
    }
    $(this).children(".span_for_svg_uslugi_mniej_niz_768_px_in_button")
    .children(".svg_uslugi_mniej_niz_768_px_in_button")
    .toggleClass("down");
  }
});

// Scrollowanie ekranu, po kliknięciu w przycisk w usługach,
// do miejsca szczegółowych informacji na temat poszczególnych usług
// Dotyczy ekranów większych niż 768px - menu boczne
// WYŁĄCZONE PONIEWAŻ PSUJE UX
// $('#v-pills-tab a').click(function(e){
//     $('html, body').animate({
//         scrollTop: $('#uslugi_wiecej_niz_768_px').offset().top - 100
//     }, 0, 'linear');
// });

// Scrollowanie ekranu, po kliknięciu w przycisk w usługach,
// do miejsca szczegółowych informacji na temat poszczególnych usług
// Dotyczy ekranów mniejszych niż 768px - akordeon
$("#uslugi_mniej_niz_768_px").on("shown.bs.collapse", e => {
  $("html, body").animate({
      scrollTop: $(e.target).prev().offset().top - 100
    }, 0, 'linear');
});

// Scrollowanie ekranu po kliknięciu w prziski w menu (navbar)
$("#przyciski_menu li a").click(function(e){
  var target = $(this).text().toLowerCase().replace(" ","_").replace("ł","l")
  $("html, body").animate({
      scrollTop: $("#"+target).offset().top - 300
    }, 0, 'linear');
});
