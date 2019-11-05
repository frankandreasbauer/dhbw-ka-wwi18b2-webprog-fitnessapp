
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
        // pageDom.querySelector("#hinzBtn").addEventListener("click", () => this.getAllTrains());
        pageDom.querySelector("#loeschBtn").addEventListener("click", () => this.myDeleteFunction());
        // pageDom.querySelector("#loeschBtn").addEventListener("click", () => this.getAllTrains());
        pageDom.querySelector("#kategorie").addEventListener("click", () => this.kategorieSwitch());

        this.getAllTrains();
        this._app.setPageTitle("Trainingsplan",{isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));

    }

  // object = this._app.firebase.selectTrainById("id1");
  // row = table.insertRow(1);
  // select = row.insertCell(0);
  // kat=row.insertCell(1);
  // uebung = row.insertCell(2);
  // satz = row.insertCell(3);
  // wdh = row.insertCell(4);
  // gewicht = row.insertCell(5);
  // select.innerHTML=this.createRadioElement(object.id)
  kategorieSwitch(){
    if(document.getElementById("kategorie").value == "Cardio"){
      document.getElementById("satz").placeholder = "Entfernung in m";
      document.getElementById("wdh").placeholder="Zeit";
      document.getElementById("gewicht").style.display="none";
  }else if(document.getElementById("kategorie").value == "Kraft"){
    document.getElementById("satz").placeholder = "Sätze";
    document.getElementById("wdh").placeholder="Wiederholungen";
    document.getElementById("gewicht").style.display="inherit";
  }

  }


    tableButton() {
      var table = document.getElementById("train-insert");
      if(document.getElementById("uebung").value == ""){
      alert("Bitte alle Felder füllen");
    }
    else if(document.getElementById("satz").value ==""){
      alert("Bitte alle Felder füllen");
    }
    else if(document.getElementById("kategorie").value ==""){
      alert("Bitte alle Felder füllen");
    }
    else if(document.getElementById("wdh").value ==""){
      alert("Bitte alle Felder füllen");
    }
    // else if(document.getElementById("gewicht").value ==""){
    //   alert("Bitte alle Felder füllen");
    // }
    else {
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
      }else{
          satz.innerHTML = document.getElementById("satz").value;
      }

      if(document.getElementById("kategorie").value == "Cardio")
      {
      satz.innerHTML = document.getElementById("wdh").value+"min";
      }
      else{
        wdh.innerHTML = document.getElementById("wdh").value;
      }
      gewicht.innerHTML = document.getElementById("gewicht").value + "Kg";
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

    createRadioElement(name, checked) {
          var radioHtml = '<input type="checkbox" id="' + name + '"';
          if ( checked ) {
              radioHtml += ' checked="checked"';
          }
          radioHtml += '/>';
          return radioHtml;
      }


    myDeleteFunction() {
      if(document.getElementById("train-insert").rows.length == 1){
        alert("Tabelle ist leer");
      }
      else{
      for (var i = 1; i < this.count; i++){
        if(document.getElementById("id"+i).checked != null){
        if(document.getElementById("id"+i).checked == true){
          var del = this.count-i;
          document.getElementById("train-insert").deleteRow(del);

          this._app.firebase.deleteTrainById("id"+i);
          this.count = this.count-1;
        }
      }
      }

      var table = document.getElementById("train-insert");
      var z = this.count-1;
      for (var j = 1, row; row = table.rows[j]; j++) {
        row.cells[0].innerHTML="";
        row.cells[0].innerHTML=this.createRadioElement("id"+z);
        z = z-1;
      }
      }
    }


}

// function createRadioElement(name, checked) {
//     var radioHtml = '<input type="checkbox" id="' + name + '"';
//     if ( checked ) {
//         radioHtml += ' checked="checked"';
//     }
//     radioHtml += '/>';
//
//     // var radioFragment = document.createElement('div');
//     // radioFragment.innerHTML = radioHtml;
//
//     // return radioFragment.firstChild;
//     return radioHtml;
// }



// function tableButton() {
//   var table = document.getElementById("train-insert");
//   if(document.getElementById("uebung").value == ""){
//   alert("Bitte alle Felder füllen");
// }
// else if(document.getElementById("satz").value ==""){
//   alert("Bitte alle Felder füllen");
// }
// else if(document.getElementById("wdh").value ==""){
//   alert("Bitte alle Felder füllen");
// }
// else if(document.getElementById("gewicht").value ==""){
//   alert("Bitte alle Felder füllen");
// }
// else {
//   var row = table.insertRow(1);
//   var select = row.insertCell(0);
//   var kat=row.insertCell(1);
//   var uebung = row.insertCell(2);
//   var satz = row.insertCell(3);
//   var wdh = row.insertCell(4);
//   var gewicht = row.insertCell(5);
//   select.innerHTML = createRadioElement("id"+count,false);
//   kat.innerHTML = document.getElementById("kategorie").value;
//   uebung.innerHTML = document.getElementById("uebung").value;
//   satz.innerHTML = document.getElementById("satz").value;
//   wdh.innerHTML = document.getElementById("wdh").value;
//   gewicht.innerHTML = document.getElementById("gewicht").value;
//   document.getElementById("kategorie").value="";
//   document.getElementById("uebung").value ="";
//   document.getElementById("satz").value ="";
//   document.getElementById("wdh").value ="";
//   document.getElementById("gewicht").value ="";
//   count = count+1;
//   this._app.firebase.saveTrain({
//     id: count,
//     kategorie: kat.innerHTML,
//     uebung: uebung.innerHTML,
//     satz: satz.innerHTML,
//     wdh: wdh.innerHTML,
//     gewicht: gewicht.innerHTML
//   });
//   }
// }

// function myDeleteFunction() {
//   if(document.getElementById("train-insert").rows.length == 1){
//     alert("Tabelle ist leer");
//   }
//   else{
//   for (var i = 1; i < count; i++){
//     if(document.getElementById("id"+i).checked != null){
//     if(document.getElementById("id"+i).checked == true){
//       var del = count-i;
//       document.getElementById("train-insert").deleteRow(del);
//       count = count-1;
//     }
//   }
//   }
//
//   var table = document.getElementById("train-insert");
//   var z = count-1;
//   for (var j = 1, row; row = table.rows[j]; j++) {
//     row.cells[0].innerHTML="";
//     row.cells[0].innerHTML=createRadioElement("id"+z);
//     z = z-1;
//   }
//   }
// }
