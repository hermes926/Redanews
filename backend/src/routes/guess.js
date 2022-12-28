import { Router } from "express";

const router = Router();

router.post('/:id', async (req, res) => {
    
    res.status(200).send({message: "hi"});
})

router.get('/:id', async (req, res) => {

    res.status(200).send({message: "hi"});
})

// router.delete("/cards",  async (_, res) => {
//     try {
//         await ScoreCard.deleteMany({});
//         res.status(200).send({ message: 'Database cleared' });
//     } catch (e) { 
//         console.log("Delete Error!");
//         res.status(500).send({ message: 'Internal Server Error!' });
//     }
// });

// router.post("/card", async (req, res) => {
//     const existing = await ScoreCard.findOne({ name: req.body.name, subject: req.body.subject });
//     if (existing) {
//         existing.score = req.body.score;
//         await existing.save();
//         res.status(200).send({ message: 'Updating (' + req.body.name + ', ' + req.body.subject + ', ' + req.body.score + ')', card: existing});
//     } else {
//         const newUser = new ScoreCard(req.body);
//         await newUser.save();
//         res.status(200).send({ message: 'Adding (' + req.body.name + ', ' + req.body.subject + ', ' + req.body.score + ')', card: newUser});
//     }
    
// });

// router.get("/cards", async (req, res) => {
//     if (req.query.type === 'name'){
//         const existing = await ScoreCard.find({ name: req.query.queryString });
//         if (existing.length > 0) {
//             let str = "";
//             existing.map((item) => {
//                 str += "Found card with name: (" + item.name + ", " + item.subject + ", " + item.score + ")\n"
//             })
//             res.status(200).send({ messages: str});
//         } else {
//             res.status(200).send({ message: "Name(" + req.query.queryString + ") not found!"});
//         }
//     } else {
//         const existing = await ScoreCard.find({ subject: req.query.queryString });
//         if (existing.length > 0) {
//             let str = "";
//             existing.map((item) => {
//                 str += "Found card with subject: (" + item.name + ", " + item.subject + ", " + item.score + ")\n"
//             })
            
//             res.status(200).send({ messages: str});
//         } else {
            
//             res.status(200).send({ message: "Subject(" + req.query.queryString + ") not found!"});
//         }
//     }
//     // try {
//     //     await ScoreCard.deleteMany({});
//     //     res.status(200).send({ message: 'Database cleared' });
//     // } catch (e) { 
        
//     //     res.status(406).send({ message: 'Internal Server Error!' });
//     // }
// });

export default router;
