
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

        this._app.setPageTitle("Ziele", {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }


    minusCount(){
      this.counter = this.counter - 1;
      document.getElementById("mitte").value = this.counter;
    }

    plusCount(){
      this.counter = this.counter + 1;
      document.getElementById("mitte").value = this.counter;
    }

}
