const { DatabaseOperations } = require('./index')

class User extends DatabaseOperations {
    constructor() {
        super('users')
        this.PROJECT = {
            table: 'projects',
            pivot: 'users_projects_pivot',
            pk: 'user_id',
            fk: 'project_id',
            fk_pivot: 'project_id',
            key: 'user_id',
        }
    }
}

module.exports = new User()