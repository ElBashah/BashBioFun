const router = require('express').Router();
const admin = require("firebase-admin");
const db = admin.firestore();

router.post('/addTestimonial', async (req, res) => {
    const {
        testimonial
    } = req.body;

    try{

        let date = new Date();
        let imgURL = "";
        
        const bucket = admin.storage().bucket();
        
        if (testimonial.img) {

            let img_name = date.getTime() / 1000 + testimonial.img.name;
            var base64Data = testimonial.img.file.replace(/^data:image\/png;base64,/, "");

            require("fs").writeFile(img_name, base64Data, 'base64', function(err) {
            console.log(err);
            });

            await bucket.upload(img_name,{
                metadata: {
                    cacheControl: 'public, max-age=31536000',
                },
              })

            const file = bucket.file(img_name);
            await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
            }).then(signedUrls => {
                imgURL = signedUrls[0];
                return true;
            });

            require("fs").unlinkSync(img_name);
        }

        const testimonial_ref = db.collection("testimonials").doc();
        await testimonial_ref.set({
            testimonial_id: testimonial_ref.id,
            name: testimonial.name,
            position: testimonial.position,
            org: testimonial.org,
            testimonial: testimonial.testimonial,
            img: imgURL,
        }).then(r => {return r})

        res.status(202).send({ msg: "Thanks for youe recommendation!", response_code: 2000 });
    
    } catch (error) {
        console.log("this is error", error)
        res.status(400).send('[ERR]::[AddNewRecFAIL]');
    }
});

module.exports = router;
