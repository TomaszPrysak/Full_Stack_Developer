// Reakcja na otwarcie okna przeglądarki i każdorazową zmianę jej rozmiaru
$(document).ready(function(){
  updateContainer();
  $(window).resize(function(){
    updateContainer();
  });
});

// Zmiana wyglądu obszaru usług. Graniczna wartość to 768px szerokości okna przeglądarki (na co wpływa szerokość ekranu urządzenia na którym jest wyświetlana)
// Powyżej 768px usługi prezentowane są w postaci "menu bocznego"
// Poniżej 768px usługi prezentowane są w postaci "akordeonu"
function updateContainer() {
  var $containerHeight = $(window).width();
  if ($containerHeight < 768) {
    $("#uslugi_wiecej_niz_768_px").hide();
    $("#uslugi_mniej_niz_768_px").show();
  } else {
    $("#uslugi_mniej_niz_768_px").hide();
    $("#uslugi_wiecej_niz_768_px").show();
  }
  $("#oczekiwanie_na_wyslanie_formularza_kontaktowego").hide();
  $("#wyslanie_formularza_kontaktowego").show();
  $(".do_disable").attr("disabled",false);
  $("#okienko_po_wyslaniu_formularza_sukces").hide();
  $("#okienko_po_wyslaniu_formularza_blad").hide();
}

// Funkcja sprawdzająca czy element który jest argumentem funkcji
// jest widziany aktulanie przez użytkownika na ekranie.
// Funkcja zwraca "true" jeżeli element jest aktualnie wyświetlany na ekranie,
// bądź "false" jeżeli nie jest aktualnie wyświetlany na ekranie.
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};
