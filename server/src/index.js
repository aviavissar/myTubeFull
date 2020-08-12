const express = require('express');
require('./db/mongoose')
const catagoriesRouter = require('./routers/catagories')
const usersRouter = require('./routers/users')
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());


// app.use((req, res, next) => {
//     res.status(503).send('the site is under maintenance')
// })

app.use(express.json())
app.use(express.static('public'))
app.use(catagoriesRouter, usersRouter)

app.listen(port, () => {
    console.log('server is up in port ' + port)
})
