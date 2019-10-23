

    "use strict";


    /**
     * View mit der Übersicht der vorhandenen Songs.
     */
    class persönlicheDaten {
        /**
         * Konstruktor.
         * @param {Objekt} app Zentrales App-Objekt der Anwendung
         */
        constructor(app) {
            this._app = app;
        }

        /**
         * Von der Klasse App aufgerufene Methode, um die Seite anzuzeigen. Die
         * Methode gibt daher ein passendes Objekt zurück, das an die Methode
         * _switchVisibleContent() der Klasse App übergeben werden kann, um ihr
         * die darzustellenden DOM-Elemente mitzuteilen.
         *
         * @return {Object} Darzustellende DOM-Elemente gemäß Beschreibung der
         * Methode App._switchVisibleContent()
         */
         onShow() {
       // Anzuzeigende HTML-Elemente ermitteln
       let section = document.querySelector("#persDatSec").cloneNode(true);

       let content = {
           className: "persDatSec",
           topbar: section.querySelectorAll("header > *"),
           main: section.querySelectorAll("main > *"),
       };

       // Event Handler registrieren
       let newSongItem = section.querySelector("main .button #persDatBtn");

       newSongItem.addEventListener("click", () => {
           this._app.showSongDisplayEdit("", "new");
       })

       // Ergebnis zurückliefern
       return content;
   }

        /**
         * Von der Klasse App aufgerufene Methode, um festzustellen, ob der Wechsel
         * auf eine neue Seite erlaubt ist. Wird hier true zurückgegeben, wird der
         * Seitenwechsel ausgeführt.
         *
         * @param  {Function} goon Callback, um den Seitenwechsel zu einem späteren
         * Zeitpunkt fortzuführen, falls wir hier false zurückgeben
         * @return {Boolean} true, wenn der Seitenwechsel erlaubt ist, sonst false
         */
        onLeave(goon) {
            return true;
        }

        /**
         * @return {String} Titel für die Titelzeile des Browsers
         */
        get title() {
            return "Übersicht";
        }
    }

    export default persönlicheDaten;
