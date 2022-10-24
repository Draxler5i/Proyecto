const express = require('express')
const userRouter = require('./routes')

// Initializations
const app = express();
const PORT = process.env.PORT_DEV

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api', userRouter)

// Starting the Server
app.listen(PORT, () => {
    console.log(`Server on port`, PORT);
});
