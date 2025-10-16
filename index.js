const ClosureCompiler = require('google-closure-compiler').compiler;
const fs = require('fs')
const path = require('path')
// console.log(ClosureCompiler.COMPILER_PATH); // absolute path to the compiler jar
// console.log(ClosureCompiler.CONTRIB_PATH); // absolute path to the contrib folder which contain externs
const modules = [
  "core", "kazmath", "shaders", "render-texture", "motion-streak",
  "clipping-nodes", "shape-nodes", "actions",
  "progress-timer", "labels", "compression",
  "text-input", "ccui"
]
const engineDir = 'frameworks/cocos2d-html5'
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

closureCompiler.run((exitCode, stdOut, stdErr) => {
  //compilation complete
  if (stdErr) console.log('err', stdErr)
  console.log('done', stdOut)
});

new ClosureCompiler({
  js: [
    "cocos2d/physics/CCPhysicsSprite.js",
    "cocos2d/physics/CCPhysicsDebugNode.js",
    "cocos2d/physics/CCPhysicsDebugNodeCanvasRenderCmd.js",
    "cocos2d/physics/CCPhysicsDebugNodeWebGLRenderCmd.js",
    "cocos2d/physics/CCPhysicsSpriteCanvasRenderCmd.js",
    "cocos2d/physics/CCPhysicsSpriteWebGLRenderCmd.js",
    "external/chipmunk/chipmunk.js"
  ].map(f => engineDir + '/' + f),
  js_output_file: 'lib/chipmunk.min.js',
  compilation_level: 'WHITESPACE_ONLY',
  debug: true
}).run((exitCode, stdOut, stdErr) => {
  //compilation complete
  if (stdErr) console.log('err chipmunk', stdErr)
  console.log('done chipmunk', stdOut)
});

new ClosureCompiler({
  js: [
    "cocos2d/compression/gzip.js",
    "cocos2d/compression/zlib.min.js",
    "cocos2d/tilemap/CCTGAlib.js",
    "cocos2d/tilemap/CCTMXTiledMap.js",
    "cocos2d/tilemap/CCTMXXMLParser.js",
    "cocos2d/tilemap/CCTMXObjectGroup.js",
    "cocos2d/tilemap/CCTMXLayer.js",
    "cocos2d/tilemap/CCTMXLayerCanvasRenderCmd.js",
    "cocos2d/tilemap/CCTMXLayerWebGLRenderCmd.js"
  ].map(f => engineDir + '/' + f),
  js_output_file: 'lib/tilemap.min.js',
  compilation_level: 'WHITESPACE_ONLY',
  debug: true
}).run((exitCode, stdOut, stdErr) => {
  //compilation complete
  if (stdErr) console.log('err tilemap', stdErr)
  console.log('done tilemap', stdOut)
});

new ClosureCompiler({
  js: [
    "cocos2d/particle/CCPNGReader.js",
    "cocos2d/particle/CCTIFFReader.js",
    "cocos2d/particle/CCParticleSystem.js",
    "cocos2d/particle/CCParticleSystemCanvasRenderCmd.js",
    "cocos2d/particle/CCParticleSystemWebGLRenderCmd.js",
    "cocos2d/particle/CCParticleExamples.js",
    "cocos2d/particle/CCParticleBatchNode.js",
    "cocos2d/particle/CCParticleBatchNodeCanvasRenderCmd.js",
    "cocos2d/particle/CCParticleBatchNodeWebGLRenderCmd.js"
  ].map(f => engineDir + '/' + f),
  js_output_file: 'lib/particle.min.js',
  compilation_level: 'WHITESPACE_ONLY',
  debug: true
}).run((exitCode, stdOut, stdErr) => {
  //compilation complete
  if (stdErr) console.log('err particle', stdErr)
  console.log('done particle', stdOut)
});

new ClosureCompiler({
  js: [
    "cocos2d/audio/CCAudio.js"
  ].map(f => engineDir + '/' + f),
  js_output_file: 'lib/audio.min.js',
  compilation_level: 'WHITESPACE_ONLY',
  debug: true
}).run((exitCode, stdOut, stdErr) => {
  //compilation complete
  if (stdErr) console.log('err audio', stdErr)
  console.log('done audio', stdOut)
});
