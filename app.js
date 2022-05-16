const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const PORT = config.get('port');

////not realized filtration: вид объекта, тип жилья, продавец;

app.listen(PORT, () => {
    console.log('App has been started on port:', PORT);
});

app.use(express.json());

app.use('/api', require('./routes/app.routes'));

if(process.env.NODE_ENV === 'production') {
    app.use('/',express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req , res) => {
        res.sendFile(path.resolve((__dirname, 'client', 'build', 'index.html')));
    })
}

async function start() {
    await mongoose.connect(config.get('mongoUri')).then(() => {
        console.log('Connected to the  db');
    });
}

start()
    .then(() => console.log('Server is ready to take the requests and send responses'))
    .catch((e) => console.log(`Program has been stopped because of ${e}`));


