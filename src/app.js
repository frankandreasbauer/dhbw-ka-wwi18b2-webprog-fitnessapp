class App {

    //// Funktionert so nicht!
    // database = new Database();
    // halloString = "Hallo, Welt";

    constructor() {
        this.database = new Database();
    }

    run() {
        // Klick auf das Hamburger-Menu abfangen
        let menuIcon = document.querySelector("header nav .toggle-menu a");
        menuIcon.addEventListener("click", this.toggleHamburgerMenu);

        // Klick auf den Zurück-Pfeil abfangen
        let backIcon = document.querySelector("header nav .go-back a");
        backIcon.addEventListener("click", () => window.history.back());

        // Inhalt der ersten Seite anzeigen
      window.addEventListener("hashchange", () => this._handleRouting())
      this._handleRouting();
    }

    toggleHamburgerMenu() {
        // Menü ein- oder ausblenden
        let menuList = document.querySelector("header nav .menu-right");

        if (menuList.classList.contains("small-screen-hidden")) {
            menuList.classList.remove("small-screen-hidden");
        } else {
            menuList.classList.add("small-screen-hidden");
        }
    }

    // Single Page Router: Wertet die aktuelle URL aus und entscheidet anhand
    // der Suchmuster in this._pages, welche Kassse aufgerufen werden soll,
    // um die angeforderte App-Seite anzuzeigen.

    handleRouting() {
      let pageUrl = location.hash.slice(1); // Alles, was hinter # steht
      if (pageURL.length == 0) pageUrl = "/"; // Gehe auf Startseite, wenn nichts angegeben inspect

      // RegExes prüfen, welche Klasse aufgerufen werden soll
      let page = this._pages.find(p => pageUrl.match(p.url));

      if(!page){
        console.error('Keine Seite für URL ${pageUrl} gefunden');
      } else {
          console.log(page);
        }

        // Gefundene Klasse aufrufen, damit die Seite sichtbar wird
        this._currentPage = new page.Klass(this);
        this._CurrentPage.show();
      }

}
