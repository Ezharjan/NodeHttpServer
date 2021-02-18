const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));
//console.log(__dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
    console.log('axios get handled !');
    res.send('Your request handled !');
});


app.get('/', (req, resp) => { indexPageResponse(req, resp) });
app.get('/index.html', (req, resp) => { indexPageResponse(req, resp) });
app.get('/index.htm', (req, resp) => { indexPageResponse(req, resp) });
app.get('/index', (req, resp) => { indexPageResponse(req, resp) });


app.listen(80, () => {
    console.log('Server is running...')
});



const indexPageResponse = (_req, _resp) => {
    console.log("Remote IP is %s", _req.connection.remoteAddress, ";   Remote port is: ", _req.connection.remotePort, ".");
    _resp.send(indexHTML);
}

/*允许跨域 */
app.use(function (req, res, next) {
    //console.log(req);
    console.log(req.method);
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Token,Accept,Authorization");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.header("content-type", "multipart/form-data");
    res.header("content-type", "application/x-www-form-urlencoded");
    res.header("content-type", "application/json; charset=utf-8");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Expose-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("cache-control", "no-cache");
    res.header("ETag", '');


    //header头信息设置结束后，结束程序往下执行，返回
    if (req.method.toLocaleLowerCase() === 'options') {
        res.status(204);
        return res.json({}); //直接返回空数据，结束此次请求
    } else {
        next();
    }
});


let indexHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Serv</title>
</head>

<div align="center">
    <h1>Welcome to Serv developed by Alexander Ezharjan</h1>
    <h1></h1>
    <h3>You can visit any files at the relevant directory with http80server.js file.</h3>
</div>

<body>

</body>

</html>
`;