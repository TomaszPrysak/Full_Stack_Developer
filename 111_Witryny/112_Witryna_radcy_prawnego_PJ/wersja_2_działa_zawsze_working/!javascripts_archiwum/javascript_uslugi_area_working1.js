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

// Scrollowanie ekranu do miejsca szczegółowych informacji na temat poszczególnych usług
// Dotyczy ekranów większych niż 768px - menu boczne
$('#v-pills-tab a').click(function(e){
    $('html, body').animate({
        scrollTop: $('#uslugi_wiecej_niz_768_px').offset().top - 100
    }, 200);
});

// Scrollowanie ekranu do miejsca szczegółowych informacji na temat poszczególnych usług
// Dotyczy ekranów mniejszych niż 768px - akordeon
$("#uslugi_mniej_niz_768_px").on("shown.bs.collapse", e => {
  $("html, body").animate({
      scrollTop: $(e.target).prev().offset().top - 100
    }, 200);
});
