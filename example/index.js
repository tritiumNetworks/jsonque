const path = require('path').resolve()
const jsonQue = require('../index')

console.log('Testing ' + jsonQue.name + ' v' + jsonQue.version)

const json = new jsonQue.JsonFile(path + '/example/sample/data.json')

json.read((data, err) => {
  if (err) console.error(err)
  for (let c = 0; c < 9999999; c++) {
    data.test = c
    json.write(data, () => {
      console.log(c)
    })
  }
})
