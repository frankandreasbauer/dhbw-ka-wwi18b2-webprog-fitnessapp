
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
  count =1;
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
    pageDom.querySelector("#hinzBtn").addEventListener("click", () => this.tableButton());
    pageDom.querySelector("#loeschBtn").addEventListener("click", () => this.myDeleteFunction());
    pageDom.querySelector("#kategorie").addEventListener("click", () => this.kategorieSwitch());

    // Bisherige Trainingseinheiten aus Datenbank laden
    this.getAllTrains();
    this._app.setPageTitle("Trainingsplan",{isSubPage: true});
    this._app.setPageCss(css);
    this._app.setPageHeader(pageDom.querySelector("header"));
    this._app.setPageContent(pageDom.querySelector("main"));

  }

  // Anzeige je nach ausgewählter Kategorie anzeigen
  kategorieSwitch(){
    if(document.getElementById("kategorie").value == "Cardio"){
      document.getElementById("satz").style.display="inherit";
      document.getElementById("satz").placeholder = "Entfernung in m";
      document.getElementById("wdh").placeholder="Zeit";
      document.getElementById("gewicht").style.display="none";
    }else if(document.getElementById("kategorie").value == "Kraft"){
      document.getElementById("satz").style.display="inherit";
      document.getElementById("satz").placeholder = "Sätze";
      document.getElementById("wdh").placeholder="Wiederholungen";
      document.getElementById("gewicht").style.display="inherit";
    }
    else if(document.getElementById("kategorie").value == "Regeneration"){
      document.getElementById("satz").style.display="none";
      document.getElementById("wdh").placeholder="Zeit in min";
      document.getElementById("gewicht").style.display="none";
    }

  }

  // Eingetragene Trainingsdaten zu Tabellen und Datenbank hinzfügen
  async tableButton() {
    var table = document.getElementById("train-insert");
    if(document.getElementById("uebung").value == ""){
      alert("Bitte alle Felder füllen");
    }
    else if(document.getElementById("kategorie").value ==""){
      alert("Bitte alle Felder füllen");
    }
    else if(document.getElementById("wdh").value ==""){
      alert("Bitte alle Felder füllen");
    }
    else {
      let training = await this._app.firebase.selectAllTrains("train");
      training.forEach(trainings => {
        if(trainings.id == "id"+this.count){
          this.count = this.count+1;
        }
      });
      var row = table.insertRow(1);
      var select = row.insertCell(0);
      var kat=row.insertCell(1);
      var uebung = row.insertCell(2);
      var satz = row.insertCell(3);
      var wdh = row.insertCell(4);
      var gewicht = row.insertCell(5);
      select.innerHTML = this.createRadioElement("id"+this.count,false);
      kat.innerHTML = document.getElementById("kategorie").value;
      uebung.innerHTML = document.getElementById("uebung").value;
      if(document.getElementById("kategorie").value == "Cardio")
      {
        satz.innerHTML = document.getElementById("satz").value+"m";
        gewicht.innerHTML = "-";
        wdh.innerHTML = document.getElementById("wdh").value+"min";

      }else if(document.getElementById("kategorie").value == "Regeneration")
      {
        wdh.innerHTML = document.getElementById("wdh").value+"min";
        gewicht.innerHTML = "-";
        satz.innerHTML = "-";
      }
      else{
        wdh.innerHTML = document.getElementById("wdh").value;
        satz.innerHTML = document.getElementById("satz").value;
        gewicht.innerHTML = document.getElementById("gewicht").value + "Kg";
      }
      this._app.firebase.saveTrain({
        id: "id"+this.count,
        kategorie: kat.innerHTML,
        uebung: uebung.innerHTML,
        satz:  satz.innerHTML,
        wdh:  wdh.innerHTML,
        gewicht:  gewicht.innerHTML
      });
      document.getElementById("kategorie").value="";
      document.getElementById("uebung").value ="";
      document.getElementById("satz").value ="";
      document.getElementById("wdh").value ="";
      document.getElementById("gewicht").value ="";
      this.count = this.count+1;
    }
  }

  // Trainingseinheiten aus der Datenbank beim Laden der Seite in Tabelle anzeigen
  async  getAllTrains(){
    let training = await this._app.firebase.selectAllTrains("train");
    var table = document.getElementById("train-insert");
    training.forEach(trainings => {
      this.count = this.count+1;
      var row = table.insertRow(1);
      var select = row.insertCell(0);
      var kat=row.insertCell(1);
      var uebung = row.insertCell(2);
      var satz = row.insertCell(3);
      var wdh = row.insertCell(4);
      var gewicht = row.insertCell(5);
      select.innerHTML = this.createRadioElement(trainings.id);
      kat.innerHTML = trainings.kategorie;
      uebung.innerHTML = trainings.uebung;
      satz.innerHTML = trainings.satz;
      wdh.innerHTML = trainings.wdh;
      gewicht.innerHTML = trainings.gewicht;
    });
  }

  // Radiobutton für Tabelle erstellen
  createRadioElement(name, checked) {
    var radioHtml = '<input type="checkbox" id="' + name + '"';
    if ( checked ) {
      radioHtml += ' checked="checked"';
    }
    radioHtml += '/>';
    return radioHtml;
  }

  // Datensatz aus Tabelle und Datenbank löschen
  async   myDeleteFunction() {
    if(document.getElementById("train-insert").rows.length == 1){
      alert("Tabelle ist leer");
    }
    else{
      var reihen = 0;
      for (var i = this.count; i>=1; i--){

        if(document.getElementById("id"+i) != null){
          reihen = reihen + 1;
          if(document.getElementById("id"+i).checked == true){
            document.getElementById("train-insert").deleteRow(reihen);
            this._app.firebase.deleteTrainById("id"+i);
          }
        }
      }
      reihen = 0;
      this.count = this.count-1;

      var z = this.count;
      z = z-1;
      for (var j = 1, row; row = table.rows[j]; j++) {
        row.cells[0].innerHTML="";
        row.cells[0].innerHTML=this.createRadioElement("id"+z);
        z = z-1;
      }
    }
  }
}
