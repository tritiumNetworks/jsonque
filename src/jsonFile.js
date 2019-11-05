const fs = require('fs')
const ReadJob = require('./readJob')
const WriteJob = require('./writeJob')

class jsonFile {
  constructor (path, option) {
    this.path = path
    this.option = option || null

    this.stats = { firstRead: null, lastRead: null, firstWrite: null, lastWrite: null }
    this.status = 200

    if (this.option && typeof this.option === 'object') {
      this.debug = typeof this.option.debug === 'boolean' ? this.option.debug : false
      this.onWork = typeof this.option.onWork === 'function' ? this.option.onWork : null
      this.onRead = typeof this.option.onRead === 'function' ? this.option.onRead : null
      this.onWrite = typeof this.option.onWrite === 'function' ? this.option.onWrite : null
      this.onInit = typeof this.option.onInit === 'function' ? this.option.onInit : null

      this.autoDo = typeof this.option.autoDo === 'boolean' ? this.option.autoDo : true
    } else {
      this.debug = false
      this.autoDo = true
    }

    this.jobs = { queue: [], next: 0 }

    if (this.verification()) this.status = 0
    else this.status = 400

    if (this.onWork) this.onWork('Initialization')
    if (this.onInit) this.onInit()
  }

  verification () {
    this.status = 201
    if (!this.path) return false
    if (typeof this.path !== 'string') return false
    if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, 'null')

    this.status = 101
    this.rawData = fs.readFileSync(this.path).toString('utf-8')
    if (!this.stats.firstRead) this.stats.firstRead = new Date()
    if (this.onWork) this.onWork('Read')
    if (this.onRead) this.onRead()
    this.stats.lastRead = new Date()

    this.status = 201
    try { JSON.parse(this.rawData) } catch (error) { return false }

    if (this.onWork) this.option.onWork('Verification')

    return true
  }

  read (callback) {
    this.jobs.queue[this.jobs.queue.length] = new ReadJob(this, callback)
    if (this.autoDo) this.doStep()
  }

  write (data, callback) {
    if (data) this.jobs.queue[this.jobs.queue.length] = new WriteJob(data, this, callback)
    if (this.autoDo) this.doStep()
  }

  clearJobs () {
    this.jobs.queue = []
    this.jobs.next = 0
  }

  doStep (callback) {
    if (this.status === 0 && this.jobs.queue[this.jobs.next]) {
      this.jobs.queue[this.jobs.next].do(() => {
        this.jobs.next++
        if (typeof callback === 'function') callback()
      })
    } else if (typeof callback === 'function') callback()
  }
}

module.exports = jsonFile
