<?php
   header('Content-Type: application/json');
   $name = $_POST['imie'];
   $email = $_POST['email'];
   $telefon = $_POST['tel'];
   $tematForm = $_POST['temat'];
   $postmessage = $_POST['tresc'];
   $to = "janas.radcaprawny@gmail.com";
   if ( $tematForm !== "") {
     $subject = $tematForm." - wiadomość wyłał(a) ".$name." przez stronę piotrjanas.com";
   } else {
     $subject = "Otrzymałeś wiadomość od ".$name." wysłaną przez stronę piotrjanas.com";
   }

   $message = "<p>Osoba:<br><b>".$name."</b></p>";
   $message .= "<p>Podająca nastepujący adres email:<br><b>".$email."</b><p>";
   if ( $telefon !== "" ) {
     $message .= "<p>Oraz następujący numer telefonu:<br><b>".$telefon."</b></p>";
   }
   if ( $tematForm !== "" ) {
     $message .= "<p>Napisała wiadomość w sprawie:<br><b>".$tematForm."</b></p>";
     $message .= "<p>O nastepującej treści:<br><b>".$postmessage."</b><br>";
   } else {
     $message .= "<p>Napisała następującą wiadomość:<br><b>".$postmessage."</b><br>";
   }

   $header = "From:"+$email+" \r\n";
   $header .= "MIME-Version: 1.0\r\n";
   $header .= "Content-type: text/html\r\n";
   $retval = mail ($to,$subject,$message,$header);

   if( $retval == true ) {
      echo json_encode(array(
         'success'=> true,
         'message' => 'Message sent successfully'
      ));
   } else {
      echo json_encode(array(
         'error'=> true,
         'message' => 'Error sending message'
      ));
   }
?>
