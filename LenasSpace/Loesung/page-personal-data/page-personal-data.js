
"use strict";

/**
 * Klasse PageNotFound: Stellt eine Defaultseite zur Verfügung, die immer
 * dann angezeigt wird, wenn der Anwender eine unbekannte URL aufruft.
 */
class PagePersonalData {
    /**
     * Konstruktor
     * @param {App} app Zentrale Instanz der App-Klasse
     */
    constructor(app) {
        this._app = app;
    }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show() {
        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-personal-data/page-personal-data.html");
        let css = await fetch("page-personal-data/page-personal-data.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts")
            return;
        }

        // Seite zur Anzeige bringen
        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;
        pageDom.querySelector("#bmiBtn").addEventListener("click", () => this.bmiRechnen());
        pageDom.querySelector("#bmiBtn").addEventListener("click", () => this.idealgewichtRechnen());
        pageDom.querySelector('#pdDeleteBtn').addEventListener("click", () => this.angabenLoeschen());
        pageDom.querySelector('#tagesbedarfBtn').addEventListener("click", () => this.körperAuswahl());
        pageDom.querySelector('#kalorienbedarfBtn').addEventListener("click", () => this.kalorienbedarfRechnen());

        this. getAllPerDat();
        this._app.setPageTitle("Persönliche Daten",{isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }

    async  getAllPerDat(){
          let perDat = await this._app.firebase.selectAllPerDat("perDat");
          perDat.forEach(perDats => {
            document.getElementById("name").value = perDats.name;
            document.getElementById("geschlecht").value =perDats.geschlecht;
            document.getElementById("größe").value = perDats.groesse;
            document.getElementById("gewicht").value = perDats.gewicht;
            document.getElementById("bmiAusgabe").value = perDats.bmi;

          });
      }

    bmiRechnen() {
      var größe = document.getElementById("größe").value;
      var gewicht = document.getElementById("gewicht").value;
      var alter = document.getElementById("alter").value;
      var bmi = gewicht / (größe / 100 * größe / 100);
      bmi = bmi.toFixed(1);
      document.getElementById("bmiAnzeige").style.display = "inline-block";
      document.getElementById("idealgewichtAnzeige").style.display = "inline-block";
      this._app.firebase.savePer({
        id:"idPerDat",
        name: document.getElementById("name").value,
        alter: document.getElementById("alter").value,
        bmi: bmi,
        geschlecht: document.getElementById("geschlecht").value,
        groesse: document.getElementById("größe").value,
        gewicht: document.getElementById("gewicht").value
      });
      this._app.firebase.saveWuGe({
        id:"idWuGew",
        wugew:"0"
      });
      if (größe > 300 || größe < 50 || gewicht < 20 || gewicht > 800 || alter <= 0 || alter > 150) {
        document.getElementById("bmiAnfang").style.display ="none";
        document.getElementById("bmiAusgabe").style.display ="none";
        document.getElementById("bmiBewertung").value = "Bitte geben Sie korrekte Werte an.";
      }
      else {
      if (bmi < 10){
      document.getElementById("bmiAnfang").style.display ="none";
      document.getElementById("bmiAusgabe").style.display ="none";
      document.getElementById("bmiBewertung").value = "Bitte geben Sie korrekte Werte an.";}
      if (bmi > 10 && bmi < 20){
      document.getElementById("bmiAnfang").style.display ="unset";
      document.getElementById("bmiAusgabe").style.display ="unset";
      document.getElementById("bmiBewertung").value = "Sie haben Untergewicht.";
      document.getElementById("bmiAusgabe").value = bmi;}
      if (bmi > 20){
      document.getElementById("bmiAnfang").style.display ="unset";
      document.getElementById("bmiAusgabe").style.display ="unset";
      document.getElementById("bmiBewertung").value = "Sie haben Normalgewicht.";
      document.getElementById("bmiAusgabe").value = bmi;}
      if (bmi > 25){
      document.getElementById("bmiAnfang").style.display ="unset";
      document.getElementById("bmiAusgabe").style.display ="unset";
      document.getElementById("bmiBewertung").value = "Sie haben Übergewicht.";
      document.getElementById("bmiAusgabe").value = bmi;}
      if (bmi > 30){
      document.getElementById("bmiAnfang").style.display ="unset";
      document.getElementById("bmiAusgabe").style.display ="unset";
      document.getElementById("bmiBewertung").value = "Sie haben Adipositas.";
      document.getElementById("bmiAusgabe").value = bmi;}
      if (bmi > 40){
      document.getElementById("bmiAnfang").style.display ="unset";
      document.getElementById("bmiAusgabe").style.display ="unset";
      document.getElementById("bmiBewertung").value = "Sie haben starke Adipositas.";
      document.getElementById("bmiAusgabe").value = bmi;}
      if (bmi > 100){
      document.getElementById("bmiAnfang").style.display ="none";
      document.getElementById("bmiAusgabe").style.display ="none";
      document.getElementById("bmiBewertung").value = "Bitte geben Sie korrekte Werte an.";}
    }
    }

    idealgewichtRechnen() {
      var größe = document.getElementById("größe").value;
      var alter = document.getElementById("alter").value;
      var idealgewicht = größe - 100 + (alter/10) * 0.9;
      idealgewicht.toFixed(1);
      if (größe > 300 || größe < 50 || gewicht < 20 || gewicht > 800 || alter <= 0 || alter > 150){
      document.getElementById("idealgewichtAnfang").style.display ="none";
      document.getElementById("idealgewichtAusgabe").style.display = "none";
      document.getElementById("idealgewichtBewertung").value = "Bitte geben Sie korrekte Werte an.";}
    else{
      if (alter > 0 && alter < 150 ){
      document.getElementById("idealgewichtAnfang").style.display ="inline-block";
      document.getElementById("idealgewichtAusgabe").style.display = "inline-block";
      document.getElementById("idealgewichtAusgabe").value = idealgewicht.toFixed(1) + "kg";
      document.getElementById("idealgewichtBewertung").value = "";}
    }
    }

angabenLoeschen() {
  document.getElementById("name").value = "";
  document.getElementById("alter").value = "";
  document.getElementById("geschlecht").value = "";
  document.getElementById("größe").value = "";
  document.getElementById("gewicht").value = "";
  document.getElementById("bmiAnzeige").style.display = "none";
  document.getElementById("idealgewichtAnzeige").style.display = "none";
  document.getElementById("auswahlText").style.display = "none";
  document.getElementById("man1").style.display = "none";
  document.getElementById("man2").style.display = "none";
  document.getElementById("man3").style.display = "none";
  document.getElementById("woman1").style.display = "none";
  document.getElementById("woman2").style.display = "none";
  document.getElementById("woman3").style.display = "none";
  document.getElementById("rb1").style.display = "none";
  document.getElementById("rb2").style.display = "none";
  document.getElementById("rb3").style.display = "none";
  document.getElementById("auswahlError").style.display = "inline";
  document.getElementById("kalorienbedarfBtn").style.display = "none";
  document.getElementById("kalorienAnzeige").style.display = "none";
    this._app.firebase.deletePersnDatById("idPerDat");
}

körperAuswahl() {
  var größe = document.getElementById("größe").value;
  var alter = document.getElementById("alter").value;
  var geschlecht = document.getElementById("geschlecht");
  var gender = geschlecht.options[geschlecht.selectedIndex].value;

  if (größe > 300 || größe < 50 || gewicht < 20 || gewicht > 800 || alter <= 0 || alter > 150){
    document.getElementById("auswahlError").style.display = "inline";
    document.getElementById("bmiAnzeige").style.display = "none";
    document.getElementById("idealgewichtAnzeige").style.display = "none";
    document.getElementById("auswahlText").style.display = "none";
    document.getElementById("man1").style.display = "none";
    document.getElementById("man2").style.display = "none";
    document.getElementById("man3").style.display = "none";
    document.getElementById("woman1").style.display = "none";
    document.getElementById("woman2").style.display = "none";
    document.getElementById("woman3").style.display = "none";
    document.getElementById("rb1").style.display = "none";
    document.getElementById("rb2").style.display = "none";
    document.getElementById("rb3").style.display = "none";
    document.getElementById("kalorienbedarfBtn").style.display = "none";
    document.getElementById("kalorienAnzeige").style.display = "none";

  }

  else {

  if (gender == "w"){
    document.getElementById("auswahlError").style.display = "none";
    document.getElementById("auswahlText").style.display = "inline-block";
    document.getElementById("woman1").style.display = "inline";
    document.getElementById("woman2").style.display = "inline";
    document.getElementById("woman3").style.display = "inline";
    document.getElementById("man1").style.display = "none";
    document.getElementById("man2").style.display = "none";
    document.getElementById("man3").style.display = "none";
    document.getElementById("rb1").style.display = "inline-block";
    document.getElementById("rb2").style.display = "inline-block";
    document.getElementById("rb3").style.display = "inline-block";
    document.getElementById("kalorienbedarfBtn").style.display = "inline-block";
  }

  if (gender == "m"){
    document.getElementById("auswahlError").style.display = "none";
    document.getElementById("auswahlText").style.display = "inline-block";
    document.getElementById("man1").style.display = "inline";
    document.getElementById("man2").style.display = "inline";
    document.getElementById("man3").style.display = "inline";
    document.getElementById("woman1").style.display = "none";
    document.getElementById("woman2").style.display = "none";
    document.getElementById("woman3").style.display = "none";
    document.getElementById("rb1").style.display = "inline-block";
    document.getElementById("rb2").style.display = "inline-block";
    document.getElementById("rb3").style.display = "inline-block";
    document.getElementById("kalorienbedarfBtn").style.display = "inline-block";
  }
}
}

kalorienbedarfRechnen(){
  var gewicht = document.getElementById("gewicht").value;
  var größe = document.getElementById("größe").value;
  var alter = document.getElementById("alter").value;
  document.getElementById("kalorienAnzeige").style.display = "inline-block";

if(größe > 300 || größe < 50 || gewicht < 20 || gewicht > 800 || alter <= 0 || alter > 150) {
    document.getElementById("kalorienAnzeige").value = "Bitte geben Sie korrekte Werte an.";
}
else{
if(document.getElementById('rb1').checked){
  var kalorien = (gewicht *10 + größe * 6.25 - alter * 5)* 1.1;
  document.getElementById('kalorienAnzeige').value = "Ihr täglicher Energiebedarf beträgt: " + kalorien.toFixed(1) + " kcal.";
}
if(document.getElementById('rb2').checked){
  var kalorien = (gewicht *10 + größe * 6.25 - alter * 5)* 1.0;
  document.getElementById('kalorienAnzeige').value = "Ihr täglicher Energiebedarf beträgt: " + kalorien.toFixed(1) + " kcal.";
}
if(document.getElementById('rb3').checked){
  var kalorien = (gewicht *10 + größe * 6.25 - alter * 5)* 0.9;
  document.getElementById('kalorienAnzeige').value = "Ihr täglicher Energiebedarf beträgt: " + kalorien.toFixed(1) + " kcal.";
}
}


}

}
