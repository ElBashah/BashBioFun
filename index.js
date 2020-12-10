const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')({origin: true});

const serviceAccount = require("./configs/serviceAccountKey.json")
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://bashbio.firebaseio.com",
        storageBucket: "bashbio.appspot.com"
        
    });
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(require("./routes"))

exports.app = functions.https.onRequest(app);
