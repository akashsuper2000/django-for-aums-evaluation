var http = require('http');
var url = require('url');
var express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));

const { spawn } = require('child_process')

function onreq(req,res){
	
	console.log(req.body);

	var user = req.body.user;
	var pass = req.body.pass;

	return new Promise((resolve, reject) => {
    const process = spawn('python', ['./aumseval.py', user, pass]);

    const out = []
    process.stdout.on(
      'data',
      (data) => {
        out.push(data.toString());
        logOutput('stdout')(data);
      }
    );


    const err = []
    process.stderr.on(
      'data',
      (data) => {
        err.push(data.toString());
        logOutput('stderr')(data);
      }
    );

    process.on('exit', (code, signal) => {
      //logOutput('exit')(`${code} (${signal})`)
      resolve(out);
    });
  });
}



function run() {
  return new Promise((resolve, reject) => {
    const process = spawn('python', ['./aumseval.py', 'cb.en.u4cse17105', 'akash2000']);

    const out = []
    process.stdout.on(
      'data',
      (data) => {
        out.push(data.toString());
        logOutput('stdout')(data);
      }
    );


    const err = []
    process.stderr.on(
      'data',
      (data) => {
        err.push(data.toString());
        logOutput('stderr')(data);
      }
    );

    process.on('exit', (code, signal) => {
      //logOutput('exit')(`${code} (${signal})`)
      resolve(out);
    });
  });
}

(async () => {
  try {
    const output = await run()
    process.exit(0)
  } catch (e) {
    console.error(e.stack);
    process.exit(1);
  }
})();

module.exports = app;