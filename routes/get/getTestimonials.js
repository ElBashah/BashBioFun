const router = require('express').Router();
const { query } = require('express');
const admin = require("firebase-admin");
const db = admin.firestore();

router.get('/getTestimonials', async (req, res) => {
    try{

        const testimonials = await db.collection("testimonials").get();

        let result = [];
        testimonials.forEach(doc => { result.push(doc.data()) })
        res.status(202).send(result);
    
    } catch (error) {
        console.log("this is error", error)
        res.status(400).send('[ERR]::[AddNewRecFAIL]');
    }
});

module.exports = router;
