
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


        this._app.setPageTitle("Persönliche Daten",{isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }

    bmiRechnen() {
      var größe = document.getElementById("größe").value;
      var gewicht = document.getElementById("gewicht").value;
      var bmi = gewicht / (größe / 100 * größe / 100);
      bmi = bmi.toFixed(1);
      document.getElementById("bmiAusgabe").value = bmi;
      if (bmi < 10){
      document.getElementById("bmiBewertung").value = "Bitte geben Sie korrekte Werte an.";}
      if (bmi > 10 && bmi < 20){
      document.getElementById("bmiBewertung").value = "Sie haben Untergewicht.";}
      if (bmi > 20){
      document.getElementById("bmiBewertung").value = "Sie haben Normalgewicht.";}
      if (bmi > 25){
      document.getElementById("bmiBewertung").value = "Sie haben Übergewicht.";}
      if (bmi > 30){
      document.getElementById("bmiBewertung").value = "Sie haben Adipositas.";}
      if (bmi > 40){
      document.getElementById("bmiBewertung").value = "Sie haben starke Adipositas.";}
      if (bmi > 100){
      document.getElementById("bmiBewertung").value = "Bitte geben Sie korrekte Werte an.";}
      }
}
