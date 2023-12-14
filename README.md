# Install
- `npm i -g pnpm`
- `pnpm i`
- `pnpm start`
# sub module
- copy frameworks folder
- `git submodule add https://github.com/cocos-frameworks/cocos2d-html5.git frameworks/cocos2d-html5`
- `git submodule update --init`

- fix: `"typeRoots": [
  "./node_modules/cocos-html5-ts/@types",
  "./node_modules/@types",
  "./@types",
],
`