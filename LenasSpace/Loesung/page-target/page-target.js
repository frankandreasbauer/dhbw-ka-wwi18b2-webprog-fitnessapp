
"use strict";

/**
 * Klasse PageNotFound: Stellt eine Defaultseite zur Verfügung, die immer
 * dann angezeigt wird, wenn der Anwender eine unbekannte URL aufruft.
 */

class PageTarget {

    /**
     * Konstruktor
     * @param {App} app Zentrale Instanz der App-Klasse
     */
    constructor(app) {
        this._app = app;
    }
    counter = 0;

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show() {
        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-target/page-target.html");
        let css = await fetch("page-target/page-target.css");

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
        pageDom.querySelector("#links").addEventListener("click", () => this.minusCount());
        pageDom.querySelector("#rechts").addEventListener("click", () => this.plusCount());

        this.getGewicht();
        this._app.setPageTitle("Ziele", {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }

    async  getGewicht(){
          let perDat = await this._app.firebase.selectAllPerDat("perDat");
          perDat.forEach(perDats => {
            document.getElementById("aktGew").value = perDats.gewicht;
            // document.getElementById("mitte").value = perDats.gewicht;
            this.counter =perDats.gewicht;
          });
           document.getElementById("mitte").value = this.counter;
      }

      setTraining()
      {

      }


    minusCount(){
      this.counter = this.counter - 1;
      document.getElementById("mitte").value = this.counter;

      var z = 5;
      var p = document.getElementById("aktGew").value - document.getElementById("mitte").value;

      var table = document.getElementById("tableTrain");
      if(document.getElementById("tableTrain").rows.length == 2){
        document.getElementById("tableTrain").deleteRow(1);
      }

      if(document.getElementById("aktGew").value - document.getElementById("mitte").value < z)
      {

        var row = table.insertRow(1);
        var montag = row.insertCell(0);
        var dienstag =row.insertCell(1);
        var mittwoch = row.insertCell(2);
        var donnerstag = row.insertCell(3);
        var freitag = row.insertCell(4);
        var samstag = row.insertCell(5);
        var sonntag = row.insertCell(6);
        montag.innerHTML = "Krafttraining";
        dienstag.innerHTML = "Regeneration";
        mittwoch.innerHTML = "Krafttraining";
        donnerstag.innerHTML = "Regeneration";
        freitag.innerHTML = "Krafttraining";
        samstag.innerHTML = "Regeneration";
        sonntag.innerHTML = "Krafttraining";
      }

      if(document.getElementById("aktGew").value - document.getElementById("mitte").value >= z)
      {

        var row = table.insertRow(1);
        var montag = row.insertCell(0);
        var dienstag =row.insertCell(1);
        var mittwoch = row.insertCell(2);
        var donnerstag = row.insertCell(3);
        var freitag = row.insertCell(4);
        var samstag = row.insertCell(5);
        var sonntag = row.insertCell(6);
        montag.innerHTML = "Krafttraining";
        dienstag.innerHTML = "Cardio";
        mittwoch.innerHTML = "Krafttraining";
        donnerstag.innerHTML = "Cardio";
        freitag.innerHTML = "Krafttraining";
        samstag.innerHTML = "Regeneration";
        sonntag.innerHTML = "Regeneration";
      }
    }

    plusCount(){
      this.counter++;
      document.getElementById("mitte").value = this.counter;

      var z = -5;
      var p = document.getElementById("aktGew").value - document.getElementById("mitte").value;

      var table = document.getElementById("tableTrain");
      if(document.getElementById("tableTrain").rows.length == 2){
        document.getElementById("tableTrain").deleteRow(1);
      }

      if(document.getElementById("aktGew").value - document.getElementById("mitte").value >= z)
      {

        var row = table.insertRow(1);
        var montag = row.insertCell(0);
        var dienstag =row.insertCell(1);
        var mittwoch = row.insertCell(2);
        var donnerstag = row.insertCell(3);
        var freitag = row.insertCell(4);
        var samstag = row.insertCell(5);
        var sonntag = row.insertCell(6);
        montag.innerHTML = "Krafttraining";
        dienstag.innerHTML = "Regeneration";
        mittwoch.innerHTML = "Krafttraining";
        donnerstag.innerHTML = "Regeneration";
        freitag.innerHTML = "Krafttraining";
        samstag.innerHTML = "Regeneration";
        sonntag.innerHTML = "Regeneration";
      }

      if(document.getElementById("aktGew").value - document.getElementById("mitte").value < z)
      {

        var row = table.insertRow(1);
        var montag = row.insertCell(0);
        var dienstag =row.insertCell(1);
        var mittwoch = row.insertCell(2);
        var donnerstag = row.insertCell(3);
        var freitag = row.insertCell(4);
        var samstag = row.insertCell(5);
        var sonntag = row.insertCell(6);
        montag.innerHTML = "Krafttraining";
        dienstag.innerHTML = "Krafttraining";
        mittwoch.innerHTML = "Krafttraining";
        donnerstag.innerHTML = "Krafttraining";
        freitag.innerHTML = "Krafttraining";
        samstag.innerHTML = "Regeneration";
        sonntag.innerHTML = "Regeneration";
      }
    }

}
