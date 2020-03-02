const { spawn } = require('child_process')

//
function run() {
  return new Promise((resolve, reject) => {
    const process = spawn('python', ['./aumseval.py', 'cb.en.u4cse17124', 'NITHESH123']);

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