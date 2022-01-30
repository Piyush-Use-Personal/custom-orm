const { DatabaseOperations } = require('./index')

class Page extends DatabaseOperations {
    constructor() {
        super('pages')
    }
}

module.exports = new Page()