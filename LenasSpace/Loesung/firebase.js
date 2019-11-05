

class Firebase{
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
    this._perDat = this._db.collection("perDat");
  }

  saveTrain(train) {
    this._train.doc(train.id).set(train);
}

savePer(perDat) {
  this._perDat.doc(perDat.id).set(perDat);
}

async deleteTrainById(id) {
    return this._train.doc(id).delete();
}

async selectAllTrains(collection) {
    let result = await this._train.orderBy("id").get();
    let trains = [];

    result.forEach(entry => {
        let train = entry.data();
        trains.push(train);
    });

    return trains;
}

async selectAllPerDat(collection) {
    let result = await this._perDat.orderBy("name").get();
    let perDats = [];

    result.forEach(entry => {
        let perDat = entry.data();
        perDats.push(perDat);
    });

    return perDats;
}


async selectTrainById(id) {
    let result = await this._train.doc(id).get();
    return result.data();
}


//   async selectAllTrain() {
//     let result = await this._train.orderBy("uebung").get();
//     let trains = [];
//
//     result.forEach(entry => {
//         let train = entry.data();
//         trains.push(train);
//     });
//
//     return trains;
// }
//
// async selectBookById(id) {
//     let result = await this._train.doc(id).get();
//     return result.data();
// }
//
// saveBook(train) {
//     this._train.doc(train.id).set(train);
// }
//
// async deleteBookById(id) {
//     return this._train.doc(id).delete();
// }
//
// async saveBooks(trains) {
//     let batch = this._db.batch();
//
//     books.forEach(train => {
//         let dbTrain = this._train.doc(train.id);
//         batch.set(dbTrain, train);
//     });
//
//     return batch.commit();
// }
//
// async deleteBooksById(ids) {
//     let batch = this._db.batch();
//
//     ids.forEach(id => {
//         let dbTrain = this._train.doc(id);
//         batch.delete(dbTrain);
//     });
//
//     return batch.commit();
// }

}
