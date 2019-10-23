
"use strict";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
class App {
    /**
     * Konstruktor.
     */
     /**
      * Konstruktor.
      */
     constructor() {
         this._title = "My Songbook";
         this._currentView = null;
     }
     /**
       * Ab hier beginnt die Anwendung zu laufen.
       */
       persönlicheDaten() {
             let view = new persönlicheDaten(this);
             this._switchVisibleView(view);
         }
      start() {
          this.persönlicheDaten();
      }

      /**
       * Aufruf der Übersichtsseite der vorhandenen Songs.
       * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
       */




/**
 * Auswechseln des sichtbaren Inhalts der App. Hierfür muss der Methode
 * ein Objekt mit folgendem Aufbau übergeben werden:
 *
 *   {
        className: "CSS-Klassenname",
 *      topbar: [DOM Element, DOM Element, DOM Element, ...],
 *      main: [DOM Element, DOM Element, DOM Element, ...],
 *   }
 *
 * Beide Attribute (topbar und main) sind optional, was dazu führt, dass
 * im jeweiligen Bereich einfach nichts angezeigt wird. Werden sie jedoch
 * mitgegeben, müssen sie mit forEach(element => { … }) iteriert werden
 * können, um ihren Inhalt in den DOM-Baum zu integrieren.
 *
 * Wichtig ist, dass die übergebenen Elemente noch an keiner Stelle im
 * DOM vorhanden sein dürfen. Werden die Elemente in der index.html
 * als Vorlage definiert, muss hier deshalb eine Kopie anstelle der
 * Elemente selbst übergeben werden!
 *
 * @param {Object} content Objekt mit den anzuzeigenden DOM-Elementen
 */

 /**
 * Hilfsklasse zum Umschalten auf eine neue Seite. Sie ruft zunächst die
 * Methode onLeave() der gerade sichtbaren View auf und prüft damit, ob
 * die View verlassen werden kann. Falls ja ruft sie die Methode onShow()
 * der neuen View auf und übergibt das Ergebnis an die eigene Methode
 * _switchVisibleContent(), um den sichtbaren Inhalt der Seite auszutauschen.
 *
 * @param  {Object} view View-Objekt mit einer onShow()-Methode
 * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
 */
_switchVisibleView(view) {
    // Callback, mit dem die noch sichtbare View den Seitenwechsel zu einem
    // späteren Zeitpunkt fortführen kann, wenn sie in der Methode onLeave()
    // false zurückliefert. Dadurch erhält sie die Möglichkeit, den Anwender
    // zum Beispiel zu fragen, ob er ungesicherte Daten speichern will,
    // bevor er die Seite verlässt.
    let goon = () => this._switchVisibleView(view);

    // Aktuelle View fragen, ob eine neue View aufgerufen werden darf
    if (this._currentView && !this._currentView.onLeave(goon)) {
        return false;
    }

    // Alles klar, aktuelle View nun wechseln
    document.title = `${this._title} – ${view.title}`;

    this._currentView = view;
    this._switchVisibleContent(view.onShow());
    return true;
}


_switchVisibleContent(content) {
    // <header> und <main> des HTML-Grundgerüsts ermitteln
    let app = document.querySelector("#app");
    let header = document.querySelector("#app > header");
    let main = document.querySelector("#app > main");

    // Zuvor angezeigte Inhalte entfernen
    // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
    app.className = "";
    header.querySelectorAll(".bottom").forEach(e => e.parentNode.removeChild(e));
    main.innerHTML = "";

    // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
    if (content && content.className) {
        app.className = content.className;
    }

    // Neue Inhalte der Topbar einfügen
    if (content && content.topbar) {
        content.topbar.forEach(element => {
            element.classList.add("bottom");
            header.appendChild(element);
        });
    }

    // Neue Inhalte des Hauptbereichs einfügen
    if (content && content.main) {
        content.main.forEach(element => {
            main.appendChild(element);
        });
    }
}
}
