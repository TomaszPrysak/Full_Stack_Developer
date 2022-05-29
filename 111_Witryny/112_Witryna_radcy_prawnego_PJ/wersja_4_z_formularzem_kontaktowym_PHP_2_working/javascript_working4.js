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

// Wyświetlenie przycisków "Start" i "Kontakt" w momencie scrollowania w dół strony (ale tylko przy rozdzielczościach poniżej 768px)
// oraz ukrywanie przycisku "Kontakt" w momencie widoczności stopki strony wraz z kontaktem
window.onscroll = function(){
  if ( document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
    document.getElementById("goToTop").style.display = "block";
    document.getElementById("goToDown").style.display = "block";
  } else {
    document.getElementById("goToTop").style.display = "none";
    document.getElementById("goToDown").style.display = "none";
  }
  if ( $("#odniesienie_2").isInViewport() ) {
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

// Scrollowanie ekranu, po kliknięciu w przycisk w usługach,
// do miejsca szczegółowych informacji na temat poszczególnych usług
// Dotyczy ekranów większych niż 768px - menu boczne
// UWAGA !!!
// Działa tylko wtedy jeżeli nie jest widoczny na ekranie akapit o id="odniesienie".
// Dzięki temu jeżeli widoczne są wszystkie przyciski to nie jest wymagane aby
// ekran scrollował.
// Wymagana funkcja "isInViewport"
$('#v-pills-tab a').click(function(){
  if ( !$("#odniesienie").isInViewport() ) {
    $('html, body').animate({
        scrollTop: $('#uslugi_wiecej_niz_768_px').offset().top - 100
    }, 0, 'linear');
  }
});

// Scrollowanie ekranu, po kliknięciu w przycisk w usługach,
// do miejsca szczegółowych informacji na temat poszczególnych usług
// Dotyczy ekranów mniejszych niż 768px - akordeon
// UWAGA !!!
// Działa tylko wtedy jeżeli nie jest widoczny na ekranie akapit o id="odniesienie"
// Dzięki temu jeżeli widoczne są wszystkie przyciski to nie jest wymagane aby
// ekran scrollował.
// Wymagana funkcja "isInViewport"
$("#uslugi_mniej_niz_768_px").on("shown.bs.collapse", e => {
  if ( !$("#odniesienie").isInViewport() ) {
    $("html, body").animate({
        scrollTop: $(e.target).prev().offset().top - 100
    }, 0, 'linear');
  }
});

// Scrollowanie ekranu po kliknięciu w przyciski w menu (navbar)
$("#przyciski_menu li a").click(function(e){
  var target = $(this).text().toLowerCase().replace(" ","_").replace("ł","l")
  $("html, body").animate({
      scrollTop: $("#"+target).offset().top - 300
    }, 0, 'linear');
});


// Formularz
// Wyczyszczenie pól formularza
function wyczysc_formularz() {
  var polaFormularza = $("#formularzWysylkowy").find(".form-control");
  for (var i = 0; i < polaFormularza.length; i++) {
    $("#formularzWysylkowy").find(".form-control").eq(i).val("");
  }
  $(".invalid-feedback").hide();
  $(".form-control").css("border-color","#21669B");
};

$('.modal').on('hidden.bs.modal', function (e) {
  wyczysc_formularz()
  $("#okienko_po_wyslaniu_formularza_sukces").hide();
  $("#okienko_po_wyslaniu_formularza_blad").hide();
  $("#oczekiwanie_na_wyslanie_formularza_kontaktowego").hide();
  $("#okienko_z_formularzem").show();
  $(".do_disable").attr("disabled",false);
  $("#wyslanie_formularza_kontaktowego").show()
});


// formularz
function wyswietl_formularz() {
  $("#okienko_po_wyslaniu_formularza_blad").hide()
  $("#oczekiwanie_na_wyslanie_formularza_kontaktowego").hide()
  wyczysc_formularz();
  $("#okienko_z_formularzem").show()
  $(".do_disable").attr("disabled",false);
  $("#wyslanie_formularza_kontaktowego").show()
}

// function okienko_sukces() {
//   $("#okienko_z_formularzem").hide()
//   $("#okienko_po_wyslaniu_formularza_sukces").show()
// }
//
// function okienko_blad() {
//   $("#okienko_z_formularzem").hide()
//   $("#okienko_po_wyslaniu_formularza_blad").show()
// }

// Formularz
function convertTelNumber(telNumber) {
  return telNumber.replace(/ /g,"").replace("+","00").replace(/-/g,"").replace(/_/g,"").replace(/\\/g,"").replace(/\//g,"").replace(/\./g,"").replace(/\,/g,"")
}

// Formularz
function check_correct_input_form(elements) {
  var x = true;
  for (item of elements) {
    if ( item.type == "email" ) {
      if ( item.value.split("@").length == 2 ) {
        if ( item.value.split("@")[1].split(".").length == 2 ) {
          $("#invalidEmail ").hide();
          $("#email_form").css("border-color","#21669B");
        } else {
          $("#invalidEmail ").show();
          $("#email_form").css("border-color","red");
          x = false
        }
      } else {
        $("#invalidEmail").show();
        $("#email_form").css("border-color","red");
        x = false
      }
    } else if ( item.type == "text" ) {
      if ( item.name == "imiePHP" ) {
        if ( item.value.length > 1) {
          $("#invalidImie").hide();
          $("#imieNazwisko_form").css("border-color","#21669B");
        } else {
          $("#invalidImie").show();
          $("#imieNazwisko_form").css("border-color","red");
          x = false
        }
      } else if ( item.name == "tematPHP" ) {
        if ( !(item.value == "") ) {
          if ( item.value.length > 1) {
            $("#invalidTemat").hide();
            $("#temat_form").css("border-color","#21669B");
          } else {
            $("#invalidTemat").show();
            $("#temat_form").css("border-color","red");
            x = false
          }
        } else {
          $("#invalidTel").hide();
          $("#tel_form").css("border-color","#21669B");
        }
      }
    } else if ( item.type == "textarea" ) {
      if ( item.value.length > 1) {
        $("#invalidTresc").hide();
        $("#tresc_form").css("border-color","#21669B");
      } else {
        $("#invalidTresc").show();
        $("#tresc_form").css("border-color","red");
        x = false
      }
    } else if ( item.type == "tel" ) {
      if ( !(item.value == "") ) {
        var clearValue = convertTelNumber($('#tel_form').val());
        if ( /^\d+$/.test(clearValue) ) {
          $("#invalidTel").hide();
          $("#tel_form").css("border-color","#21669B");
        } else {
          $("#invalidTel").show();
          $("#tel_form").css("border-color","red");
          x = false
        }
      } else {
        $("#invalidTel").hide();
        $("#tel_form").css("border-color","#21669B");
      }
    }
  }
  return x
}

// function after_form_submitted(data) {
//   if ( data.result == 'success' ) {
//       $("#okienko_z_formularzem").hide()
//       $("#okienko_po_wyslaniu_formularza_sukces").show()
//     } else {
//       $("#okienko_z_formularzem").hide()
//       $("#okienko_po_wyslaniu_formularza_blad").show()
//     }
// };

// Formularz
$("#formularzWysylkowy").submit(function(e) {
  e.preventDefault();
  if ( check_correct_input_form($(".form-control")) ) {
    $("#wyslanie_formularza_kontaktowego").hide();
    $(".do_disable").attr("disabled",true);
    $("#oczekiwanie_na_wyslanie_formularza_kontaktowego").show();

    var data = {
      'imie': $('#imieNazwisko_form').val(),
      'email': $('#email_form').val(),
      'tel': convertTelNumber($('#tel_form').val()),
      'temat': $('#temat_form').val(),
      'tresc' : $('#tresc_form').val()
    };
    // console.log(data);
    $.ajax({
      url: 'mail.php',
      data: data,
      type: 'POST',
      success: function(data) {
        if ( data.error) {
            $("#okienko_z_formularzem").hide()
            $("#okienko_po_wyslaniu_formularza_blad").show()
          } else {
            $("#okienko_z_formularzem").hide()
            $("#okienko_po_wyslaniu_formularza_sukces").show()
          }
        }
      });
  };
});
