
"use strict";

/**
 * Klasse PageNotFound: Stellt eine Defaultseite zur Verfügung, die immer
 * dann angezeigt wird, wenn der Anwender eine unbekannte URL aufruft.
 */
class PageTraining {
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
        let html = await fetch("page-training/page-training.html");
        let css = await fetch("page-training/page-training.css");

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

        this._app.setPageTitle("Trainingsplan");
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }
}

function tableButton() {
  var table = document.getElementById("train-insert");
  if(document.getElementById("uebung").value == ""){
  alert("Bitte alle Felder füllen");
}
else if(document.getElementById("satz").value ==""){
  alert("Bitte alle Felder füllen");
}
else if(document.getElementById("wdh").value ==""){
  alert("Bitte alle Felder füllen");
}
else if(document.getElementById("gewicht").value ==""){
  alert("Bitte alle Felder füllen");
}
else {
  var row = table.insertRow(1);
  var uebung = row.insertCell(0);
  var satz = row.insertCell(1);
  var wdh = row.insertCell(2);
  var gewicht = row.insertCell(3);
  uebung.innerHTML = document.getElementById("uebung").value;
  satz.innerHTML = document.getElementById("satz").value;
  wdh.innerHTML = document.getElementById("wdh").value;
  gewicht.innerHTML = document.getElementById("gewicht").value;
  }
}

function myDeleteFunction() {

  if(document.getElementById("train-insert").rows.length == 1){
    alert("Tabelle ist leer");
  }
  else{
  document.getElementById("train-insert").deleteRow(1);}
}
