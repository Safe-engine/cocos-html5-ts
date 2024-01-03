const ClosureCompiler = require('google-closure-compiler').compiler;
const fs = require('fs')
const path = require('path')
// console.log(ClosureCompiler.COMPILER_PATH); // absolute path to the compiler jar
// console.log(ClosureCompiler.CONTRIB_PATH); // absolute path to the contrib folder which contain externs
const modules = [
  "cocos2d",
  "gui",
  "ccui",
]
const engineDir = 'cocos2d-html5'
const _jsAddedCache = {}
const configFile = path.join(__dirname, engineDir, 'moduleConfig.json')
const moduleMap = JSON.parse(fs.readFileSync(configFile)).module
function _getJsListOfModule(moduleMap, moduleName, dir) {
  if (_jsAddedCache[moduleName]) return null;
  dir = dir || "";
  var jsList = [];
  var tempList = moduleMap[moduleName];
  if (!tempList) throw new Error("can not find module [" + moduleName + "]");
  for (var i = 0, li = tempList.length; i < li; i++) {
    var item = tempList[i];
    if (_jsAddedCache[item]) continue;
    var extname = path.extname(item);
    if (!extname) {
      var arr = _getJsListOfModule(moduleMap, item, dir);
      if (arr) jsList = jsList.concat(arr);
    } else if (extname.toLowerCase() === ".js") jsList.push(path.join(dir, item));
    _jsAddedCache[item] = 1;
  }
  return jsList;
}
const jsList = []
for (var i = 0, li = modules.length; i < li; i++) {
  var arr = _getJsListOfModule(moduleMap, modules[i], engineDir);
  if (arr) jsList.push(...arr);
}
console.log(jsList.length)

const closureCompiler = new ClosureCompiler({
  js: [
    engineDir + "/CCBoot.js",
    ...jsList
  ],
  js_output_file: 'lib/cocos2d-3.17.js',
  compilation_level: 'WHITESPACE_ONLY',
  debug: true
});

const compilerProcess = closureCompiler.run((exitCode, stdOut, stdErr) => {
  //compilation complete
  console.log('err', stdErr)
  console.log('done', stdOut)
});