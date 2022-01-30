const { DatabaseOperations } = require('./index')

class User extends DatabaseOperations {
    constructor() {
        super('users')
        // this is an example of m-n relationship
        // please see pages model for one to one relationship
        // you will need a pivot table to get the relationship
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