const express = require('express');
const bodyParser= require('body-parser');
// Initializations
const app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://sanabriadiego:pruebamongo@cluster0.ci3fxdd.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then((client:any)  => {

    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req:Request, res:any) => {
      res.sendFile('/Users/sanab/Desktop/academia-digital/SDF/Proyect-prueba/src' + '/index.html')
      // Note: __dirname is the current directory you're in. Try logging it and see what you get!
      // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
      db.collection('quotes').find().toArray()
        .then((results: any) => {
          console.log(results)
        })
        .catch((error: any) => console.error(error))
      })

    app.post('/quotes', (req:Request, res: any) => {
      quotesCollection.insertOne({name: "adam", age: 27})
        .then((result: any) => {
          res.redirect('/')
        })
        .catch((error: any) => console.error(error))
    })


    // app.put('/users/:id', (req: Request, res: Response) => {
    //     const user = req.body;
    //     users.push(user);
    //     res.json(user);
    // });
    // app.delete('/users/:id', (req: Request, res: Response) => {
    //     const userDeleted = users.pop();
    //     res.json(userDeleted);

    app.listen(3000, function() {
        console.log('listening on 3000')
    })
})
.catch(console.error)

