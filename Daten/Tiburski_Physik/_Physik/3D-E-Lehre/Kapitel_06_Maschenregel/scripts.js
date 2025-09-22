// ----------------------------------------------------------------------------------------
// ---Eine Sammlung von JavaScript-Funktionen
// ---Originalname: template.js (mit den Aufgaben, Multiple choice usw.
// ---last update 17.02.1997; Autor: Bernhard Jacobs, pf00bj@rz.uni-sb.de
// ---Modifiziert und erweitert um Graphikprozeduren (Daumenkino u.a.)
// ---Neuer Name: scripts.js
// ---Modifiziert am 20.10.1998; Autor: Horst Gierhardt, gierhardt.horst@ibm.net
// ---zuletzt modifiziert am 18.04.2000 (testcheck); Autor: Jens Tiburski, jens@tiburski.de
// ----------------------------------------------------------------------------------------
// ---Hinweis: Im Internet Explorer 4 kann die Funktion window.open() zu einer
// ---Fehlermeldung fuehren. Es erscheint dann der JavaScript-Error "Schnittstelle wird
// ---nicht unterstuetzt". (Stand: Oktober 1998).
// ---Wenn dies passiert, dann ist der Explorer nicht richtig
// ---installiert worden bzw. bei der Installation wurde die Registrierung von ein oder
// ---zwei DLLs vergessen (Microsoft ist der Fehler bekannt).
// ---Der Fehler tritt bei Windows 95 und auch bei Windows NT auf.
// ---Abhilfe: In der Eingabeaufforderung folgendes eingeben:  
// ---regsvr32 actxprxy.dll (ergibt Meldung: DllRegisterServer in actxprxy.dll succeeded) 
// ---regsvr32 shdocvw.dll  (ergibt meldung: DllRegisterServer in shdocvw.dll succeeded)
// ---Nach dem Neustart des Rechners muesste dann alles auch mit diesem Browser klappen. 
// ---Mit Netscape kann es keine Probleme geben, ausser man hat JavaScript deaktiviert :-(
// ----------------------------------------------------------------------------------------

// --------------------------
function NeuesFenster (Fenstertext, Titeltext)
{
// Oeffnet ein neues Fenster, schreibt den Fenstertext hinein und 
// baut einen Button zum Schliessen des Fensters ein.
 fensteroptions = "toolbar=no,location=no,directories=no,status=no" +
                  ",scrollbars=yes,resizable=yes," +
                  "width=600,height=400";
 feedfenster = window.open("","Zweitfenster",fensteroptions)
 neudoc = feedfenster.document;

// Text fuer das neue Fenster zusammenstellen.
  astr = "<HTML><HEAD><BR><TITLE>";
  astr += Titeltext + "</TITLE></HEAD>";
  astr += "</BODY>";
  astr += Fenstertext + "<HR>";
  astr += "<CENTER>";
  astr += "<FORM><input type=button value=\"Fenster schliessen!\" " +
          "onClick=self.close()></FORM>";
  astr += "</CENTER></BODY></HTML>";
  neudoc.open ("text/html");
  neudoc.write (astr);
  neudoc.close ();  
 if (feedfenster.focus != null) {feedfenster.focus()};
} 

// --------------------------
function gibfeedback (Auswertungstext)
{
NeuesFenster (Auswertungstext, "R&uuml;ckmeldung zur Aufgabe");
}

// --------------------------
function istin (muster,antwort)
{ 
// Wandelt zuerst muster und antwort in Grossbuchstaben um.
// Stellt dann fest, ob das Muster in der Antwort enthalten ist.
var ergebnis;
  antwort = antwort.toUpperCase();
  muster = muster.toUpperCase(); 
  ergebnis = antwort.indexOf(muster);
  if (ergebnis<0) {return(false)}
  else {return (true)};
} 

// --------------------------
function istgleich (antwort,muster)
{ return (antwort == muster) }


//---------------------------
// check fuer kurze Eingaben oder auch Lueckentext
//---------------------------
function shortcheck (form)
{
 muster1 = form.muster1.value;
 muster2 = form.muster2.value;
 muster3 = form.muster3.value;
 muster4 = form.muster4.value;
 antwort = form.antwort.value;
 feedback  = form.feedback.value;
 vergleich = form.vergleich.value;
  auswertung = "";
 if (vergleich == "=")
   { 
// Ist (Antwort=Muster1) oder (Antwort=Muster2) ... und (Antwort nicht leer)?
     if ( (istgleich (antwort,muster1) || 
           istgleich (antwort,muster2) || 
           istgleich (antwort,muster3) || 
           istgleich (antwort,muster4)) && antwort != "" )
          {auswertung += "<B>exakt richtig</B>"}
     else
          {auswertung += "falsch"};
   }
    else 
   {
//antwort darf nicht leer sein; Muster kann leer sein
    if (((istin (muster1,antwort) && muster1 !="") || 
         (istin (muster2,antwort) && muster2 !="") || 
         (istin (muster3,antwort) && muster3 !="") ||
         (istin (muster4,antwort) && muster4 !="")) && antwort != ""  )
     {auswertung += "<B>wahrscheinlich richtig</B>"}
     else
      {auswertung += "falsch"};
   }
  auswertung += "<HR>" + feedback;
  gibfeedback (auswertung);
  form.bearbeitet.value = "true";
 }

// Loesung in Luecke ausgeben, wenn gewuenscht
// --------------------------
function lshortcheck (form)
{
// Testet nur auf Uebereinstimmung mit muster1
  if (form.bearbeitet.value == "true" )
  {form.antwort.value = form.muster1.value}
  else
  {alert("Erst die Aufgabe selbst beantworten!") };
}

//---------------------------
// Aufgabe mit Radiobuttons, nur eine Antwort richtig.
//---------------------------
function mccheck (form)
{ 
var i;
var itemnummer;
var korrekt;
var n;
  auswertung = "";
  n = form.mc.length;
  for (i=0; i<n; i++)
  { 
    itemnummer = i+1;
 
    if (form.mc[i].value == 1) /* Ist das eine der richtigen Antworten? */
       {
         korrekt = itemnummer;
         if (form.mc[i].checked == true)
          {  auswertung += "<B>richtig</B><BR><HR>"}
         else
          { auswertung += "<B>falsch</B> beantwortet<BR> Alternative " +
                         korrekt + " ist richtig <HR>"} 
        }
    }
  auswertung += form.feedback.value;
  gibfeedback (auswertung);
  form.bearbeitet.value="true";
}

// Loesung dazu ausgeben, wenn gewuenscht.
//---------------------------
function lmccheck (form)
{
var i;
var n;
  if (form.bearbeitet.value == "true" )
  {
    n = form.mc.length;
    for (i=0; i<n; i++)
    { 
       if (form.mc[i].value == 1) /* Ist das die richtige Antwort? */
            { form.mc[i].checked = true;
              break; 
            }
    }
  }
  else
       { alert('Erst die Aufgabe selbst beantworten!') }
}

//---------------------------
// Aufgabe mit Checkboxen; mehrere Antworten zulaessig
//---------------------------
function boxcheck (form)
{
 feedback = form.feedback.value;
 n = form.box.length;
 richtalt = 0;
 anzrichtig = 0;
 anzfalsch = 0;
 auswertung = "";
 var itemnummer;

  for (i=0; i<n; i++)
  { 
    itemnummer = i+1;
 
    if (form.box[i].value ==1)
     {
        richtalt = richtalt+1;
        auswertung = auswertung + " richtig sind :" + itemnummer;
 
        if (form.box[i].checked == true)
           {  auswertung = auswertung + " ok " + "<BR>" 
             anzrichtig = anzrichtig+1
           }
          else
           {
             auswertung = auswertung + " - " + "<BR>" 
           }
       }
   }
  auswertung += "<HR>";
  for (i=0; i<n; i++)
  { 
    itemnummer = i+1;
     if (form.box[i].value == 0)
      {
          if (form.box[i].checked == true)
          {  auswertung = auswertung + " falsch beantwortet :" + itemnummer + "<BR>";
             anzfalsch = anzfalsch + 1;
          }
      } 
  }
  if ((anzrichtig == richtalt) && (anzfalsch == 0))
  { auswertung += "<B>alles richtig</B>"};
    auswertung += "<HR><PRE>";
    auswertung += "                        Anzahl <BR>";
    auswertung += "zutreffende Alternativen: " + richtalt + "<BR>";
    auswertung += "      richtige Antworten: " + anzrichtig + "<BR>"; 
    auswertung += "       falsche Antworten: " + anzfalsch + "<BR>";
    auswertung += "</PRE><HR size=3>" + feedback;
    gibfeedback (auswertung);
    form.bearbeitet.value = "true";
}

// Loesung dazu ausgeben
//---------------------------
function lboxcheck (form)
{
  if (form.bearbeitet.value == "true" )
  {
    n = form.box.length;
    for (i=0; i<n; i++)
    { form.box[i].checked=false }
    for (i=0; i<n; i++)
    { 
       if (form.box[i].value == 1)
       { form.box[i].checked = true}
    }
  }
  else
  {alert('Erst die Aufgabe selbst beantworten!') }
}

// Hilfetext in einem neuen Fenster ausgeben
//---------------------------
function HilfMir (form)
{ NeuesFenster (form.hilfetext.value, "Eine kleine Hilfe!"); }


//---------------------------
// Freie Antwort
//---------------------------
function essay (form)
{
  auswertung = "";
  auswertung += form.feedback.value;
  gibfeedback (auswertung);
  form.bearbeitet.value = "true";
}

// Eventuell Musterloesung zu freier Antwort ausgeben
//---------------------------
function lessay (form)
{
  if (form.bearbeitet.value == "true" )
  { frage = "Hier ist es etwas schwer, eine Antwort zu geben.\n " + 
            "Klicke auf ok und entscheide dann selbst, was fuer dich sinnvoll ist."
    alert (frage);
    entscheidung = window.prompt("Musterantwort statt meiner Antwort ins Antwortfeld","Nein");
    if (entscheidung == null) {entscheidung = "Nein"}
    entscheidung = entscheidung.toUpperCase();
    if (entscheidung == "JA")
        { form.antwort.value = form.feedback.value }
      else
        {auswertung = "";
         auswertung += form.feedback.value;
         gibfeedback (auswertung);
        }
  } else { alert('Bitte zuerst die Aufgabe selbst beantworten!') };
}

//---------------------------
// Praezise Antwort muss in einem Prompt-Fenster eingegeben werden
//---------------------------
function FrageAntwort (form)
{
 Frage = form.Frage.value;
 Antwort = form.Antwort.value;
 RichtigFeedback = form.RichtigFeedback.value;
 FalschFeedback = form.FalschFeedback.value;
  if (RichtigFeedback == "") {RichtigFeedback = "Richtig!"};
  if (FalschFeedback == "") {FalschFeedback = "Leider falsch"};
  UserEingabe = window.prompt(Frage,"");
  
  if(UserEingabe == Antwort)
    { window.alert (RichtigFeedback) }
  else
    { window.alert (FalschFeedback) };
}

//---------------------------
// Routinen fuer Diashowfunktion mit Vor- und Zurueckschalter
// Kann nur einmal in einem Dokument eingesetzt werden
//---------------------------
var pics = new Array();
var BildGrundName;
var Erweiterung;
var LetzteNr;
var InternName;
var BilderGeladen = "false";

//---------------------------
function laden(name, picture) 
{  
  if (typeof pics[name] == "undefined") 
  {
       pics[name] = new Array();
       pics[name]["count"] = 0;  /* counts number of pictures */
       pics[name]["pos"] = 0;
  }
  pics[name][pics[name]["count"]] = new Image();
  pics[name][pics[name]["count"]].src = picture;
  pics[name]["count"]++;
}

//---------------------------
function EinBildZurueck (form) 
{
  if (BilderGeladen == "false") {BilderBenennen (form);}
  pics[InternName]["pos"]--;
  if (pics[InternName]["pos"]<0) pics[InternName]["pos"]= pics[InternName]["count"]-1;
  document.images[InternName].src = pics[InternName][pics[InternName]["pos"]].src;
}

//----------------------------
function EinBildVor (form) 
{
  if (BilderGeladen == "false") {BilderBenennen (form);}
  pics[InternName]["pos"]++;
  if (pics[InternName]["pos"]>=pics[InternName]["count"]) pics[InternName]["pos"]= 0;
  document.images[InternName].src = pics[InternName][pics[InternName]["pos"]].src;
}

//---------------------------
function AlleBilderLaden ()
{
var BildName = "";
  for (i=1; i <= LetzteNr; i++) 
  {
  BildName = BildGrundName + i + "." + Erweiterung;
  laden(InternName, BildName); 
  }
  BilderGeladen = "true";
}

//---------------------------
function BilderBenennen (form)
{
  BildGrundName = form.dateistamm.value;
  Erweiterung = form.erweiterung.value;
  LetzteNr = form.anzahl.value;
  InternName = form.internname.value;
  BilderGeladen = "false";
  AlleBilderLaden();
}

//----------------------------
// Zwei Bilder laden und durch Schalter wechseln
// Kann mehrmals in einem Dokument gemacht werden
//----------------------------

var RegPos = 0;
var BildAArray = new Array ();
var BildBArray = new Array ();
var BildRegArray = new Array ();  

//---------------------------
function BilderRegistrieren (form)
{
  BildAArray[RegPos]     = new Image(); 
  BildAArray[RegPos].src = form.ErsteQuelle.value;  
  BildBArray[RegPos]     = new Image(); 
  BildBArray[RegPos].src = form.ZweiteQuelle.value; 
  BildRegArray[RegPos]   = "true";
  form.regnr.value = RegPos;
  RegPos = RegPos + 1;
  BildRegArray[RegPos]   = "false";
}

//----------------------------
function Bildwechsel(BildArt,form)
{
  if ((RegPos == 0) || (form.regnr.value == "255")) {BilderRegistrieren (form)}
  else
  {
  if (BildRegArray[form.regnr.value] == "false") {BilderRegistrieren (form)}; 
  }
  if (BildArt == "normal")
  {document.images[form.internbildname.value].src = BildAArray[form.regnr.value].src}
  else
  {document.images[form.internbildname.value].src = BildBArray[form.regnr.value].src}

}

//---------------------------
// Routinen fuer Daumenkinofunktion mit Start- und Stopschalter
// Kann nur einmal in einem Dokument eingesetzt werden
//---------------------------

var KinoVerzoegerung = 120;      /* Standardwert */
var KinoBildNr = 2;              /* das naechste zu zeigende Bild */
var KinoBildEnde = 2;            /* Vorbelegung */
var KinoBilderGeladen = "false"; 
var KinoBilder = new Array();    /* nimmt die Bilder der Animation auf */
var TimeoutVar;

//---------------------------
function AlleKinoBilderLaden (form)
{
  for (i = 1; i <= KinoBildEnde; i++) 
  {
       KinoBilder[i] = new Image();
       KinoBilder[i].src = form.dateistamm.value + i + "." + form.erweiterung.value;    
  }
  KinoBilderGeladen = "true";
}

//----------------------------
function NaechstesKinoBild() 
{
  document.kino.src = KinoBilder[KinoBildNr].src;
  KinoBildNr = KinoBildNr + 1;
  if (KinoBildNr > KinoBildEnde) KinoBildNr = 1; /* Wieder von vorne beginnen */
  TimeoutVar = setTimeout ("NaechstesKinoBild()", KinoVerzoegerung);
}

//----------------------------
function KinoStart (form)
{
  if (KinoBilderGeladen == "false")
     {
     KinoVerzoegerung = form.verzoegerung.value; 
     KinoBildEnde = form.anzahl.value;
     AlleKinoBilderLaden (form);
     }
     TimeoutVar = setTimeout ("NaechstesKinoBild()", KinoVerzoegerung);
}

//---------------------------
function KinoStop (form)
{
clearTimeout (TimeoutVar);
}

//------------------------------------------------
// check fuer komplette Tests mit bis zu 70 Fragen
//------------------------------------------------
function testcheck (form)
{
 AnzahlFragen = form.AnzahlFragen.value;
 var korrekt;
 korrekt = 0

//--------------------------------------------------------------------------------
if (AnzahlFragen > 0){
 muster1 = form.muster1.value;
 antwort1 = form.antwort1.value;
}
if (AnzahlFragen > 1){
 muster2 = form.muster2.value;
 antwort2 = form.antwort2.value;
}
if (AnzahlFragen > 2){
 muster3 = form.muster3.value;
 antwort3 = form.antwort3.value;
}
if (AnzahlFragen > 3){
 muster4 = form.muster4.value;
 antwort4 = form.antwort4.value;
}
if (AnzahlFragen > 4){
 muster5 = form.muster5.value;
 antwort5 = form.antwort5.value;
}
if (AnzahlFragen > 5){
 muster6 = form.muster6.value;
 antwort6 = form.antwort6.value;
}
if (AnzahlFragen > 6){
 muster7 = form.muster7.value;
 antwort7 = form.antwort7.value;
}
if (AnzahlFragen > 7){
 muster8 = form.muster8.value;
 antwort8 = form.antwort8.value;
}
if (AnzahlFragen > 8){
 muster9 = form.muster9.value;
 antwort9 = form.antwort9.value;
}
if (AnzahlFragen > 9){
 muster10 = form.muster10.value;
 antwort10 = form.antwort10.value;
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 10){
 muster11 = form.muster11.value;
 antwort11 = form.antwort11.value;
}
if (AnzahlFragen > 11){
 muster12 = form.muster12.value;
 antwort12 = form.antwort12.value;
}
if (AnzahlFragen > 12){
 muster13 = form.muster13.value;
 antwort13 = form.antwort13.value;
}
if (AnzahlFragen > 13){
 muster14 = form.muster14.value;
 antwort14 = form.antwort14.value;
}
if (AnzahlFragen > 14){
 muster15 = form.muster15.value;
 antwort15 = form.antwort15.value;
}
if (AnzahlFragen > 15){
 muster16 = form.muster16.value;
 antwort16 = form.antwort16.value;
}
if (AnzahlFragen > 16){
 muster17 = form.muster17.value;
 antwort17 = form.antwort17.value;
}
if (AnzahlFragen > 17){
 muster18 = form.muster18.value;
 antwort18 = form.antwort18.value;
}
if (AnzahlFragen > 18){
 muster19 = form.muster19.value;
 antwort19 = form.antwort19.value;
}
if (AnzahlFragen > 19){
 muster20 = form.muster20.value;
 antwort20 = form.antwort20.value;
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 20){
 muster21 = form.muster21.value;
 antwort21 = form.antwort21.value;
}
if (AnzahlFragen > 21){
 muster22 = form.muster22.value;
 antwort22 = form.antwort22.value;
}
if (AnzahlFragen > 22){
 muster23 = form.muster23.value;
 antwort23 = form.antwort23.value;
}
if (AnzahlFragen > 23){
 muster24 = form.muster24.value;
 antwort24 = form.antwort24.value;
}
if (AnzahlFragen > 24){
 muster25 = form.muster25.value;
 antwort25 = form.antwort25.value;
}
if (AnzahlFragen > 25){
 muster26 = form.muster26.value;
 antwort26 = form.antwort26.value;
}
if (AnzahlFragen > 26){
 muster27 = form.muster27.value;
 antwort27 = form.antwort27.value;
}
if (AnzahlFragen > 27){
 muster28 = form.muster28.value;
 antwort28 = form.antwort28.value;
}
if (AnzahlFragen > 28){
 muster29 = form.muster29.value;
 antwort29 = form.antwort29.value;
}
if (AnzahlFragen > 29){
 muster30 = form.muster30.value;
 antwort30 = form.antwort30.value;
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 30){
 muster31 = form.muster31.value;
 antwort31 = form.antwort31.value;
}
if (AnzahlFragen > 31){
 muster32 = form.muster32.value;
 antwort32 = form.antwort32.value;
}
if (AnzahlFragen > 32){
 muster33 = form.muster33.value;
 antwort33 = form.antwort33.value;
}
if (AnzahlFragen > 33){
 muster34 = form.muster34.value;
 antwort34 = form.antwort34.value;
}
if (AnzahlFragen > 34){
 muster35 = form.muster35.value;
 antwort35 = form.antwort35.value;
}
if (AnzahlFragen > 35){
 muster36 = form.muster36.value;
 antwort36 = form.antwort36.value;
}
if (AnzahlFragen > 36){
 muster37 = form.muster37.value;
 antwort37 = form.antwort37.value;
}
if (AnzahlFragen > 37){
 muster38 = form.muster38.value;
 antwort38 = form.antwort38.value;
}
if (AnzahlFragen > 38){
 muster39 = form.muster39.value;
 antwort39 = form.antwort39.value;
}
if (AnzahlFragen > 39){
 muster40 = form.muster40.value;
 antwort40 = form.antwort40.value;
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 40){
 muster41 = form.muster41.value;
 antwort41 = form.antwort41.value;
}
if (AnzahlFragen > 41){
 muster42 = form.muster42.value;
 antwort42 = form.antwort42.value;
}
if (AnzahlFragen > 42){
 muster43 = form.muster43.value;
 antwort43 = form.antwort43.value;
}
if (AnzahlFragen > 43){
 muster44 = form.muster44.value;
 antwort44 = form.antwort44.value;
}
if (AnzahlFragen > 44){
 muster45 = form.muster45.value;
 antwort45 = form.antwort45.value;
}
if (AnzahlFragen > 45){
 muster46 = form.muster46.value;
 antwort46 = form.antwort46.value;
}
if (AnzahlFragen > 46){
 muster47 = form.muster47.value;
 antwort47 = form.antwort47.value;
}
if (AnzahlFragen > 47){
 muster48 = form.muster48.value;
 antwort48 = form.antwort48.value;
}
if (AnzahlFragen > 48){
 muster49 = form.muster49.value;
 antwort49 = form.antwort49.value;
}
if (AnzahlFragen > 49){
 muster50 = form.muster50.value;
 antwort50 = form.antwort50.value;
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 50){
 muster51 = form.muster51.value;
 antwort51 = form.antwort51.value;
}
if (AnzahlFragen > 51){
 muster52 = form.muster52.value;
 antwort52 = form.antwort52.value;
}
if (AnzahlFragen > 52){
 muster53 = form.muster53.value;
 antwort53 = form.antwort53.value;
}
if (AnzahlFragen > 53){
 muster54 = form.muster54.value;
 antwort54 = form.antwort54.value;
}
if (AnzahlFragen > 54){
 muster55 = form.muster55.value;
 antwort55 = form.antwort55.value;
}
if (AnzahlFragen > 55){
 muster56 = form.muster56.value;
 antwort56 = form.antwort56.value;
}
if (AnzahlFragen > 56){
 muster57 = form.muster57.value;
 antwort57 = form.antwort57.value;
}
if (AnzahlFragen > 57){
 muster58 = form.muster58.value;
 antwort58 = form.antwort58.value;
}
if (AnzahlFragen > 58){
 muster59 = form.muster59.value;
 antwort59 = form.antwort59.value;
}
if (AnzahlFragen > 59){
 muster60 = form.muster60.value;
 antwort60 = form.antwort60.value;
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 60){
 muster61 = form.muster61.value;
 antwort61 = form.antwort61.value;
}
if (AnzahlFragen > 61){
 muster62 = form.muster62.value;
 antwort62 = form.antwort62.value;
}
if (AnzahlFragen > 62){
 muster63 = form.muster63.value;
 antwort63 = form.antwort63.value;
}
if (AnzahlFragen > 63){
 muster64 = form.muster64.value;
 antwort64 = form.antwort64.value;
}
if (AnzahlFragen > 64){
 muster65 = form.muster65.value;
 antwort65 = form.antwort65.value;
}
if (AnzahlFragen > 65){
 muster66 = form.muster66.value;
 antwort66 = form.antwort66.value;
}
if (AnzahlFragen > 66){
 muster67 = form.muster67.value;
 antwort67 = form.antwort67.value;
}
if (AnzahlFragen > 67){
 muster68 = form.muster68.value;
 antwort68 = form.antwort68.value;
}
if (AnzahlFragen > 68){
 muster69 = form.muster69.value;
 antwort69 = form.antwort69.value;
}
if (AnzahlFragen > 69){
 muster70 = form.muster70.value;
 antwort70 = form.antwort70.value;
}
//--------------------------------------------------------------------------------





 feedback  = form.feedback.value;
 vergleich = form.vergleich.value;
 auswertung = "Von "+AnzahlFragen+" gestellten Fragen hast Du:<BR><BR>";

//--------------------------------------------------------------------------------
if (AnzahlFragen > 0){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort1,muster1)) && antwort1 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "1. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster1,antwort1) && muster1 !="")) && antwort1 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "1. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 1){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort2,muster2)) && antwort2 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "2. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster2,antwort2) && muster2 !="")) && antwort2 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "2. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 2){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort3,muster3)) && antwort3 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "3. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster3,antwort3) && muster3 !="")) && antwort3 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "3. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 3){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort4,muster4)) && antwort4 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "4. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster4,antwort4) && muster4 !="")) && antwort4 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "4. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 4){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort5,muster5)) && antwort5 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "5. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster5,antwort5) && muster5 !="")) && antwort5 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "5. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 5){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort6,muster6)) && antwort6 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "6. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster6,antwort6) && muster6 !="")) && antwort6 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "6. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 6){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort7,muster7)) && antwort7 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "7. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster7,antwort7) && muster7 !="")) && antwort7 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "7. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 7){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort8,muster8)) && antwort8 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "8. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster8,antwort8) && muster8 !="")) && antwort8 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "8. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 8){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort9,muster9)) && antwort9 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "9. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster9,antwort9) && muster9 !="")) && antwort9 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "9. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 9){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort10,muster10)) && antwort10 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "10. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster10,antwort10) && muster10 !="")) && antwort10 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "10. Frage falsch<br>"};
	   }
}
//-----------------------------------------------------
if (AnzahlFragen > 10){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort11,muster11)) && antwort11 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "11. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster11,antwort11) && muster11 !="")) && antwort11 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "11. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 11){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort12,muster12)) && antwort12 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "12. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster12,antwort12) && muster12 !="")) && antwort12 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "12. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 12){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort13,muster13)) && antwort13 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "13. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster13,antwort13) && muster13 !="")) && antwort13 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "13. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 13){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort14,muster14)) && antwort14 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "14. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster14,antwort14) && muster14 !="")) && antwort14 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "14. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 14){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort15,muster15)) && antwort15 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "15. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster15,antwort15) && muster15 !="")) && antwort15 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "15. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 15){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort16,muster16)) && antwort16 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "16. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster16,antwort16) && muster16 !="")) && antwort16 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "16. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 16){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort17,muster17)) && antwort17 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "17. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster17,antwort17) && muster17 !="")) && antwort17 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "17. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 17){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort18,muster18)) && antwort18 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "18. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster18,antwort18) && muster18 !="")) && antwort18 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "18. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 18){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort19,muster19)) && antwort19 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "19. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster19,antwort19) && muster19 !="")) && antwort19 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "19. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 19){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort20,muster20)) && antwort20 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "20. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster20,antwort20) && muster20 !="")) && antwort20 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "20. Frage falsch<br>"};
	   }
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 20){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort21,muster21)) && antwort21 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "21. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster21,antwort21) && muster21 !="")) && antwort21 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "21. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 21){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort22,muster22)) && antwort22 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "22. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster22,antwort22) && muster22 !="")) && antwort22 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "22. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 22){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort23,muster23)) && antwort23 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "23. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster23,antwort23) && muster23 !="")) && antwort23 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "23. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 23){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort24,muster24)) && antwort24 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "24. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster24,antwort24) && muster24 !="")) && antwort24 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "24. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 24){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort25,muster25)) && antwort25 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "25. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster25,antwort25) && muster25 !="")) && antwort25 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "25. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 25){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort26,muster26)) && antwort26 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "26. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster26,antwort26) && muster26 !="")) && antwort26 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "26. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 26){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort27,muster27)) && antwort27 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "27. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster27,antwort27) && muster27 !="")) && antwort27 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "27. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 27){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort28,muster28)) && antwort28 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "28. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster28,antwort28) && muster28 !="")) && antwort28 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "28. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 28){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort29,muster29)) && antwort29 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "29. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster29,antwort29) && muster29 !="")) && antwort29 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "29. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 29){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort30,muster30)) && antwort30 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "30. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster30,antwort30) && muster30 !="")) && antwort30 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "30. Frage falsch<br>"};
	   }
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 30){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort31,muster31)) && antwort31 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "31. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster31,antwort31) && muster31 !="")) && antwort31 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "31. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 31){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort32,muster32)) && antwort32 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "32. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster32,antwort32) && muster32 !="")) && antwort32 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "32. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 32){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort33,muster33)) && antwort33 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "33. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster33,antwort33) && muster33 !="")) && antwort33 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "33. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 33){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort34,muster34)) && antwort34 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "34. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster34,antwort34) && muster34 !="")) && antwort34 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "34. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 34){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort35,muster35)) && antwort35 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "35. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster35,antwort35) && muster35 !="")) && antwort35 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "35. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 35){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort36,muster36)) && antwort36 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "36. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster36,antwort36) && muster36 !="")) && antwort36 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "36. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 36){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort37,muster37)) && antwort37 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "37. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster37,antwort37) && muster37 !="")) && antwort37 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "37. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 37){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort38,muster38)) && antwort38 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "38. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster38,antwort38) && muster38 !="")) && antwort38 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "38. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 38){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort39,muster39)) && antwort39 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "39. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster39,antwort39) && muster39 !="")) && antwort39 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "39. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 39){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort40,muster40)) && antwort40 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "40. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster40,antwort40) && muster40 !="")) && antwort40 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "40. Frage falsch<br>"};
	   }
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 40){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort41,muster41)) && antwort41 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "41. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster41,antwort41) && muster41 !="")) && antwort41 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "41. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 41){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort42,muster42)) && antwort42 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "42. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster42,antwort42) && muster42 !="")) && antwort42 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "42. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 42){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort43,muster43)) && antwort43 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "43. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster43,antwort43) && muster43 !="")) && antwort43 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "43. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 43){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort44,muster44)) && antwort44 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "44. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster44,antwort44) && muster44 !="")) && antwort44 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "44. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 44){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort45,muster45)) && antwort45 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "45. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster45,antwort45) && muster45 !="")) && antwort45 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "45. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 45){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort46,muster46)) && antwort46 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "46. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster46,antwort46) && muster46 !="")) && antwort46 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "46. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 46){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort47,muster47)) && antwort47 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "47. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster47,antwort47) && muster47 !="")) && antwort47 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "47. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 47){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort48,muster48)) && antwort48 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "48. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster48,antwort48) && muster48 !="")) && antwort48 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "48. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 48){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort49,muster49)) && antwort49 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "49. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster49,antwort49) && muster49 !="")) && antwort49 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "49. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 49){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort50,muster50)) && antwort50 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "50. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster50,antwort50) && muster50 !="")) && antwort50 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "50. Frage falsch<br>"};
	   }
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 50){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort51,muster51)) && antwort51 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "51. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster51,antwort51) && muster51 !="")) && antwort51 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "51. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 51){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort52,muster52)) && antwort52 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "52. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster52,antwort52) && muster52 !="")) && antwort52 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "52. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 52){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort53,muster53)) && antwort53 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "53. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster53,antwort53) && muster53 !="")) && antwort53 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "53. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 53){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort54,muster54)) && antwort54 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "54. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster54,antwort54) && muster54 !="")) && antwort54 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "54. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 54){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort55,muster55)) && antwort55 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "55. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster55,antwort55) && muster55 !="")) && antwort55 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "55. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 55){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort56,muster56)) && antwort56 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "56. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster56,antwort56) && muster56 !="")) && antwort56 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "56. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 56){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort57,muster57)) && antwort57 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "57. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster57,antwort57) && muster57 !="")) && antwort57 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "57. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 57){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort58,muster58)) && antwort58 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "58. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster58,antwort58) && muster58 !="")) && antwort58 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "58. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 58){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort59,muster59)) && antwort59 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "59. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster59,antwort59) && muster59 !="")) && antwort59 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "59. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 59){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort60,muster60)) && antwort60 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "60. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster60,antwort60) && muster60 !="")) && antwort60 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "60. Frage falsch<br>"};
	   }
}
//--------------------------------------------------------------------------------
if (AnzahlFragen > 60){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort61,muster61)) && antwort61 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "61. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster61,antwort61) && muster61 !="")) && antwort61 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "61. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 61){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort62,muster62)) && antwort62 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "62. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster62,antwort62) && muster62 !="")) && antwort62 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "62. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 62){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort63,muster63)) && antwort63 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "63. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster63,antwort63) && muster63 !="")) && antwort63 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "63. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 63){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort64,muster64)) && antwort64 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "64. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster64,antwort64) && muster64 !="")) && antwort64 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "64. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 64){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort65,muster65)) && antwort65 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "65. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster65,antwort65) && muster65 !="")) && antwort65 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "65. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 65){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort66,muster66)) && antwort66 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "66. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster66,antwort66) && muster66 !="")) && antwort66 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "66. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 66){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort67,muster67)) && antwort67 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "67. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster67,antwort67) && muster67 !="")) && antwort67 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "67. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 67){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort68,muster68)) && antwort68 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "68. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster68,antwort68) && muster68 !="")) && antwort68 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "68. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 68){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort69,muster69)) && antwort69 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "69. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster69,antwort69) && muster69 !="")) && antwort69 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "69. Frage falsch<br>"};
	   }
}
if (AnzahlFragen > 69){
	 if (vergleich == "=")
	   { 
	     		if ( (istgleich (antwort70,muster70)) && antwort70 != "" )
	          		{korrekt = korrekt + 1}
	     		else
	          		{auswertung += "70. Frage falsch<br>"};
	   }
	    else 
	   {
	    		if (((istin (muster70,antwort70) && muster70 !="")) && antwort70 != ""  )
	     			{korrekt = korrekt + 1}
	     		else
	      			{auswertung += "70. Frage falsch<br>"};
	   }
}
//-----------------------------------------------------

  auswertung += "<BR>" + korrekt + " Fragen richtig beantwortet, das sind " + korrekt/AnzahlFragen*100 + " Prozent!";
  auswertung += "<HR>" + feedback;
  gibfeedback (auswertung);
  form.bearbeitet.value = "true";

 }


//----------------------------------------------------- Rechtsclick sperren ---------------------------

function rechtsclick (form)
{ 
if (document.layers){
window.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
window.onmousedown=rightclick;
window.onmouseup=rightclick;
function rightclick(e) {
if (e.which == 3) {
// Put right mouse code here
alert('Oh,Oh... Nix gibts!');
return false; 
}
else {
return true; 
}
}
}
if (document.all){
function click() {
if (event.button==2) {
alert('Oh,Oh... Nix gibts!')
}
if (event.button==3) {
alert('Oh,Oh... Nix gibts!')}
}
document.onmousedown=click
}
}

// -----Ende ------

