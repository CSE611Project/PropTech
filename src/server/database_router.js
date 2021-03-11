const express = require('express');
const router = express.Router();
const database = require('./database');
const bodyParser = require('body-parser');
const cors=require('cors');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors());

// The following commented code is for testing the connection between backend and database
// router.post('/testInsert',(req,res)=>{
//     const {user_id, category} = req.body;
//     console.log(`user_id: ${user_id},category: ${category}`);
//     database.connection.query(`INSERT into user (user_id, category) VALUES (${user_id}, ${category})`,function(err){
//         // check error type later
//         if(err) {
//             console.log('error found');
//             res.status(500).send('Sorry, we cannot find that!');
//         } else {
//             console.log('ok');
//             res.send('added');
//         }
//     });
// })

module.exports = router;


