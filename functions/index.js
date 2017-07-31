const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.historyWatcher = functions.database.ref('/users/{uid}/history').onWrite(
    (event)=>{
        let snapshot = event.data; //history ref snapshot
        if(snapshot) return setCurrentHistory(snapshot);
        else return;
    }
)

function setCurrentHistory(snapshot){

    var uid = snapshot.ref.parent.key;
    var historyList = snapshot.val()
    var writeRef = admin.database().ref(`users/${uid}/currentHistory`)

    let updateItem = []
    if(historyList) {
        for (key in obj = historyList) {
            updateItem.push(key) // recorded item push to array
        }
        updateItem.reverse()
        updateItem = updateItem.splice(0,3);
    }

    return writeRef.set(updateItem)
}
