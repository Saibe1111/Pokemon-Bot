const http = require('http');
const express = require('express');
const app = express();
const { readdirSync } = require('fs');
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let port = 8000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://192.168.1.24`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'multipart/form-data,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//load request
const loadRequest = (dirs = ['get', 'post']) => {
    dirs.forEach(fileName => {
        let dir = `./${fileName}/`
        const files = readdirSync(`${dir}/`).filter(files => files.endsWith('.js'));
        for (const file of files) {
            const getFileName = require(`${dir}/${file}`);
            getFileName.run(app);
            console.log(`${fileName.charAt(0).toUpperCase() + fileName.slice(1)} request ${file.replace('.js','')} is loaded !`)
        }
    });
}
loadRequest();

app.listen(port, () =>  {
    console.log(`Express server listening on ${port}`);
})
