const fs = require('fs')

class ReadJob {
  constructor (main, callback) {
    this.main = main
    this.onFinish = callback

    this.onRead = main.onRead
    this.onWork = main.onWork
  }

  do (callback) {
    this.main.status = 101
    fs.readFile(this.main.path, (err, rawData) => {
      rawData = rawData.toString('utf-8')
      try { JSON.parse(rawData) } catch (e) { this.main.status = 401 }
      if (err) console.error(err)
      else if (this.main.status !== 401) {
        this.main.status = 0
        if (this.onFinish) this.onFinish(JSON.parse(rawData))
        if (this.onWork) this.onWork('Read')
        if (this.onRead) this.onRead()
      } else this.onFinish(null, new SyntaxError('Input is not a JSON format'))
      callback()
    })
  }
}

module.exports = ReadJob
