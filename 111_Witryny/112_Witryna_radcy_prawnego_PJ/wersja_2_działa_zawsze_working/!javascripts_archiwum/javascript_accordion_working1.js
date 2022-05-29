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

// $( "#uslugi_mniej_niz_768_px").accordion({
//     heightStyle: "content",
//     collapsible: true,
//     active: false,
//     activate: function(event, ui){
//         if(!$.isEmptyObject(ui.newHeader.offset())) {
//             $('html:not(:animated), body:not(:animated)').animate({ scrollTop: ui.newHeader.offset().top }, 'slow');
//         }
//     }
// });
