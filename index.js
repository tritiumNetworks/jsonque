module.exports = {
  name: require('./package.json').name,
  version: require('./package.json').version,

  JsonFile: require('./src/jsonFile'),
  ReadJob: require('./src/readJob'),
  WriteJob: require('./src/writeJob')
}
