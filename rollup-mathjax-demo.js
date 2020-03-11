const resolveSync = require('resolve').sync;
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const fs = require('fs-extra');

module.exports = function(libPath, moduleName) {
  const fullPath = resolveSync(libPath, { basedir: __dirname });
  let inputOptions = {
    input: fullPath,
    plugins: [
      resolve({ browser: true }),
      commonjs()
    ]
  };
  let outputOptions = {
    file: 'output.js',
    format: 'amd',
    amd: { id: moduleName },
    exports: 'named'
  };

  return rollup.rollup(inputOptions).then((bundle) => {
    return bundle.generate(outputOptions).then((result) => {
      let code = result.output[0].code;
      fs.writeFileSync('output.js', code);
    });
  });
};

