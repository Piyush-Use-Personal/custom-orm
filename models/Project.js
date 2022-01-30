const { DatabaseOperations } = require('./index')

class Project extends DatabaseOperations {
    constructor() {
        super('projects')
        // this is an example of m-n relationship
        // please see pages model for one to one relationship
        // you will need a pivot table to get the relationship
        this.USER = {
            table: 'users',
            pivot: 'users_projects_pivot',
            pk: 'project_id',
            fk: 'user_id',
            fk_pivot: 'user_id',
            key: 'project_id',
            select: ['user_id', 'email', 'data']
        }
        // this is an example of 1-n relationship
        // please see above model for many to many relationship
        this.PAGE = {
            table: 'pages',
            pivot: 'projects',
            pk: 'project_id',
            fk: 'project_id',
            fk_pivot: 'project_id',
            key: 'project_id',
        }
    }
}

module.exports = new Project()