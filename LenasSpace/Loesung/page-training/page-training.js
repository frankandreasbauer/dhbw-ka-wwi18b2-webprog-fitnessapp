
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

function createRadioElement(name, checked) {
    var radioHtml = '<input type="checkbox" id="' + name + '"';
    if ( checked ) {
        radioHtml += ' checked="checked"';
    }
    radioHtml += '/>';

    // var radioFragment = document.createElement('div');
    // radioFragment.innerHTML = radioHtml;

    // return radioFragment.firstChild;
    return radioHtml;
}

var count =1;

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
  var select = row.insertCell(0);
  var uebung = row.insertCell(1);
  var satz = row.insertCell(2);
  var wdh = row.insertCell(3);
  var gewicht = row.insertCell(4);
  select.innerHTML = createRadioElement("id"+count,false);
  uebung.innerHTML = document.getElementById("uebung").value;
  satz.innerHTML = document.getElementById("satz").value;
  wdh.innerHTML = document.getElementById("wdh").value;
  gewicht.innerHTML = document.getElementById("gewicht").value;
  document.getElementById("uebung").value ="";
  document.getElementById("satz").value ="";
  document.getElementById("wdh").value ="";
  document.getElementById("gewicht").value ="";
  count = count+1;
  }
}

function myDeleteFunction() {
  if(document.getElementById("train-insert").rows.length == 1){
    alert("Tabelle ist leer");
  }
  else{
  for (var i = 1; i < count; i++){
    if(document.getElementById("id"+i).checked != null){
    if(document.getElementById("id"+i).checked == true){
      var del = count-i;
      document.getElementById("train-insert").deleteRow(del);
      count = count-1;
    }
  }
  }

  var table = document.getElementById("train-insert");
  var z = count-1;
  for (var j = 1, row; row = table.rows[j]; j++) {
    row.cells[0].innerHTML="";
    row.cells[0].innerHTML=createRadioElement("id"+z);
    z = z-1;
  }
  }
}
