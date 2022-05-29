// Wyświetlenie przycisków "Start" i "Kontakt" w momencie scrollowania w dół strony od 20px
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
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Po naciśnięciu przycisku "Kontakt" scrollowanie ekranu na koniec, na sam dół strony
function downFunction() {
  window.scrollTo(0, document.body.scrollHeight);
}
