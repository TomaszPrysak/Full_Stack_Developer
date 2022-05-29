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
