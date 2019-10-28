<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.2.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->



class Database{
  constructor(){
    firebase.initializeApp({
      apiKey: "AIzaSyD36mZGtDuNp-kk4PPaQoZyNpf8r3gfqVM",
      authDomain: "fralile-fit-4fecf.firebaseapp.com",
      databaseURL: "https://fralile-fit-4fecf.firebaseio.com",
      projectId: "fralile-fit-4fecf",
      storageBucket: "fralile-fit-4fecf.appspot.com",
      messagingSenderId: "370941134655",
      appId: "1:370941134655:web:ee21a1d3b8326be6ffb58a"
    });

    this._db = firebase.firestore();
    this._train = this._db.collection("train");
  }

  async selectAllTrain() {
    let result = await this._train.orderBy("uebung").get();
    let trains = [];

    result.forEach(entry => {
        let train = entry.data();
        trains.push(train);
    });

    return trains;
}

async selectBookById(id) {
    let result = await this._train.doc(id).get();
    return result.data();
}

saveBook(train) {
    this._train.doc(train.id).set(train);
}

async deleteBookById(id) {
    return this._train.doc(id).delete();
}

async saveBooks(trains) {
    let batch = this._db.batch();

    books.forEach(train => {
        let dbTrain = this._train.doc(train.id);
        batch.set(dbTrain, train);
    });

    return batch.commit();
}

async deleteBooksById(ids) {
    let batch = this._db.batch();

    ids.forEach(id => {
        let dbTrain = this._train.doc(id);
        batch.delete(dbTrain);
    });

    return batch.commit();
}

}
