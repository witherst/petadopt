//const express = require('express');
//const path = require('path');
//const cluster = require('cluster');
//const numCPUs = require('os').cpus().length;
//
//const isDev = process.env.NODE_ENV !== 'production';
//const PORT = process.env.PORT || 5000;
//
//// Multi-process to utilize all CPU cores.
//if (!isDev && cluster.isMaster) {
//  console.error(`Node cluster master ${process.pid} is running`);
//
//  // Fork workers.
//  for (let i = 0; i < numCPUs; i++) {
//    cluster.fork();
//  }
//
//  cluster.on('exit', (worker, code, signal) => {
//    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
//  });
//
//} else {
//  const app = express();
//
//  // Priority serve any static files.
//  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
//
//  // Answer API requests.
//  app.get('/api', function (req, res) {
//    res.set('Content-Type', 'application/json');
//    res.send('{"message":"Hello from the custom server!"}');
//  });
//
//  // All remaining requests return the React app, so it can handle routing.
//  app.get('*', function(request, response) {
//    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
//  });
//
//  app.listen(PORT, function () {
//    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
//  });
//}

const {createserver} = require('http');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000)

const app = express();
const dev = app.get('env') !== 'production';

// Production environment modules
if(!dev){
    app.disable('x-powered-by');
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
    app.use(morgan('common'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../react-ui/build/', 'index.html'));    // Send our index to anyone trying to access our website
    })
}

// Development environment modules
if(dev){
    app.use(morgan('dev'));
}

app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

/* TEST API HOOK. WE WOULD GET THE "CUSTOMER" VALUES FROM OUR DB. */
app.get('/api/customers', (req, res) => {
    res.set('Content-Type', 'application/json');
    const customers = [
        {id: 1, firstName: 'Yvonne', lastName: 'MARCIINKKKKYYY'},
        {id: 2, firstName: 'Tim', lastName: 'WITHERRRSSS'},
        {id: 3, firstName: 'Jenny', lastName: 'HUUUANNGGG'}
    ];

    res.json(customers);
})

app.listen(PORT, err => {
    if (err) throw err    
    console.log(`Server started on port ${PORT}! Awesome!`);
});