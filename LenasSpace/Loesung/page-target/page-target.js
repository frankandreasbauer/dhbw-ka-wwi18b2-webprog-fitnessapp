
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
          });

          let wuGew = await this._app.firebase.selectAllWuGew("wunschGew");
          wuGew.forEach(wugew => {
            if(wugew.wugew == "0")
            {
              document.getElementById("mitte").value = document.getElementById("aktGew").value;
              this.counter = document.getElementById("aktGew").value;
            }
            else{
            document.getElementById("mitte").value = wugew.wugew;
            this.counter =wugew.wugew;
            var table = document.getElementById("tableTrain");
            var row = table.insertRow(1);
            var montag = row.insertCell(0);
            var dienstag =row.insertCell(1);
            var mittwoch = row.insertCell(2);
            var donnerstag = row.insertCell(3);
            var freitag = row.insertCell(4);
            var samstag = row.insertCell(5);
            var sonntag = row.insertCell(6);
            montag.innerHTML = wugew.montag;
            dienstag.innerHTML = wugew.dienstag;
            mittwoch.innerHTML = wugew.mittwoch;
            donnerstag.innerHTML = wugew.donnerstag;
            freitag.innerHTML = wugew.freitag;
            samstag.innerHTML = wugew.samstag;
            sonntag.innerHTML = wugew.sonntag;

          }
          });
           document.getElementById("mitte").value = this.counter;
      }


    minusCount(){
      var z = 5;
      var p = document.getElementById("aktGew").value - document.getElementById("mitte").value;
      if(document.getElementById("mitte").value <= document.getElementById("aktGew").value){
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
//
// var counter = 0;  //Gewicht
//
//
// $("#links").click(function(){
//   counter = counter - 1;
//   $("#mitte a").text(counter);
// });
//
// $("#rechts").click(function(){
//   counter = counter + 1;
//   $("#mitte a").text(counter);
// });

      }

    else  if(document.getElementById("aktGew").value - document.getElementById("mitte").value >= z)
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
        mittwoch.innerHTML = "Regeneration";
        donnerstag.innerHTML = "Cardio";
        freitag.innerHTML = "Krafttraining";
        samstag.innerHTML = "Regeneration";
        sonntag.innerHTML = "Krafttraining";
      }
    }
    this.counter = this.counter - 1;
    document.getElementById("mitte").value = this.counter;
    this._app.firebase.saveWuGe({
      id:"idWuGew",
      wugew:document.getElementById("mitte").value,
      montag: montag.innerHTML,
      dienstag: dienstag.innerHTML,
      mittwoch:mittwoch.innerHTML,
      donnerstag:donnerstag.innerHTML,
      freitag:freitag.innerHTML,
      samstag:samstag.innerHTML,
      sonntag:sonntag.innerHTML
    });
    }

    // plusCount(){
    //   var z = -5;
    //   var p = document.getElementById("aktGew").value - document.getElementById("mitte").value;
    //   if(document.getElementById("mitte").value >= document.getElementById("aktGew").value){
    //   var table = document.getElementById("tableTrain");
    //   if(document.getElementById("tableTrain").rows.length == 2){
    //     document.getElementById("tableTrain").deleteRow(1);
    //   }
    //
    //   if(document.getElementById("aktGew").value - document.getElementById("mitte").value >= z)
    //   {
    //
    //     var row = table.insertRow(1);
    //     var montag = row.insertCell(0);
    //     var dienstag =row.insertCell(1);
    //     var mittwoch = row.insertCell(2);
    //     var donnerstag = row.insertCell(3);
    //     var freitag = row.insertCell(4);
    //     var samstag = row.insertCell(5);
    //     var sonntag = row.insertCell(6);
    //     montag.innerHTML = "Krafttraining";
    //     dienstag.innerHTML = "Regeneration";
    //     mittwoch.innerHTML = "Krafttraining";
    //     donnerstag.innerHTML = "Regeneration";
    //     freitag.innerHTML = "Krafttraining";
    //     samstag.innerHTML = "Regeneration";
    //     sonntag.innerHTML = "Regeneration";
    //   }
    //
    //
    //   }
    //
    // else  if(document.getElementById("aktGew").value - document.getElementById("mitte").value >= z)
    //   {
    //
    //     var row = table.insertRow(1);
    //     var montag = row.insertCell(0);
    //     var dienstag =row.insertCell(1);
    //     var mittwoch = row.insertCell(2);
    //     var donnerstag = row.insertCell(3);
    //     var freitag = row.insertCell(4);
    //     var samstag = row.insertCell(5);
    //     var sonntag = row.insertCell(6);
    //     montag.innerHTML = "Krafttraining";
    //     dienstag.innerHTML = "Cardio";
    //     mittwoch.innerHTML = "Regeneration";
    //     donnerstag.innerHTML = "Cardio";
    //     freitag.innerHTML = "Krafttraining";
    //     samstag.innerHTML = "Regeneration";
    //     sonntag.innerHTML = "Krafttraining";
    //   }
    // }
    // this.counter = this.counter - 1;
    // document.getElementById("mitte").value = this.counter;
    // this._app.firebase.saveWuGe({
    //   id:"idWuGew",
    //   wugew:document.getElementById("mitte").value,
    //   montag: montag.innerHTML,
    //   dienstag: dienstag.innerHTML,
    //   mittwoch:mittwoch.innerHTML,
    //   donnerstag:donnerstag.innerHTML,
    //   freitag:freitag.innerHTML,
    //   samstag:samstag.innerHTML,
    //   sonntag:sonntag.innerHTML
    // });
    // }

    plusCount(){
      var z = -5;
      var p = document.getElementById("aktGew").value - document.getElementById("mitte").value;
      if(document.getElementById("mitte").value >= document.getElementById("aktGew").value){
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


    else  if(document.getElementById("aktGew").value - document.getElementById("mitte").value < z)
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
        mittwoch.innerHTML = "Regeneration";
        donnerstag.innerHTML = "Krafttraining";
        freitag.innerHTML = "Krafttraining";
        samstag.innerHTML = "Krafttraining";
        sonntag.innerHTML = "Regeneration";
      }
    }
    this.counter++;
    document.getElementById("mitte").value = this.counter;
    this._app.firebase.saveWuGe({
      id:"idWuGew",
      wugew:document.getElementById("mitte").value,
      montag: montag.innerHTML,
      dienstag: dienstag.innerHTML,
      mittwoch:mittwoch.innerHTML,
      donnerstag:donnerstag.innerHTML,
      freitag:freitag.innerHTML,
      samstag:samstag.innerHTML,
      sonntag:sonntag.innerHTML
    });
  }

}
