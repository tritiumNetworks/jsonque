const fs = require('fs')

class WriteJob {
  constructor (data, main, callback) {
    this.main = main
    this.rawData = data
    this.onFinish = callback

    this.onWrite = main.onWrite
    this.onWork = main.onWork
  }

  do (callback) {
    this.main.status = 102
    fs.writeFile(this.main.path, JSON.stringify(this.rawData), (err) => {
      if (err) console.error(err)
      else {
        this.main.status = 0
        if (this.onFinish) this.onFinish()
        if (this.onWork) this.onWork('Write')
        if (this.onWrite) this.onWrite()
      }
      callback()
    })
  }
}

module.exports = WriteJob
