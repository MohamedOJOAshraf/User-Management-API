const express = require('express');
const app = express();
const port = 3001;

const connectionDb = require('./connectionDb');

const routerUser = require('./server/router/user-router');

const routerAuth = require('./server/router/auth-router');

app.use(express.json())

app.use('/api/auth',routerAuth)
app.use('/api/user',routerUser)


const start = async () => {
    try{
        await connectionDb;
        app.listen(port,() => console.log(`server work on port ${port}`));
    }catch(err){
        console.log(err)
    }
}

start()