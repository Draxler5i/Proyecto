require('dotenv').config()
const express = require('express')
const bodyParser= require('body-parser');
const app = express()
require('./database/conection')
const userRouter = require('./routers/user.router')
const ticketRouter = require('./routers/ticket.router')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
const { PORT_DEV } = process.env

app.use('/api', userRouter)
app.use('/api', ticketRouter)

app.listen(PORT_DEV, ()=> {
  console.log(`Server on port ${PORT_DEV}`)
})


// const MongoClient = require('mongodb').MongoClient

// MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('star-wars-quotes')
//     const collection = db.collection('quotes')

//     app.use(bodyParser.urlencoded({ extended: true }))

// // API
//   app.get('/product', (req, res) => {
//     db.collection('product').find().toArray()
//         .then(results => {
//             res.json(results);
//         }).catch(error => console.error(error));
//   })

//   app.post('/product', (req, res) => {
//     collection.insertOne(req.body)
//         .then(result => {
//             res.json('Success');
//         })
//         .catch(error => console.error(error))
//   })

//   app.put('/product/:id', (req, res) => {
//     collection.findOneAndUpdate(
//       { name: req.params.id },
//       {
//           $set: {
//               name: req.body.name,
//               price: req.body.price
//           }
//       },
//       {
//           upsert: true
//       }
//     ).then(result => { res.json('Updated') })
//         .catch(error => console.error(error))
//   });

//   app.delete('/product/:id', (req, res) => {
//     collection.deleteOne(
//         { name: req.params.id }
//     )
//         .then(result => {
//             res.json('Deleted')
//         })
//         .catch(error => console.error(error))
//   })

// //LOGS LISTEN

//   app.listen(3000, function () {
//     console.log('listening on '+port)
//   });

//   app.get('/', (req, res) => {
//     res.send("Hello bow!")
//   })

//     })

// .catch(console.error)