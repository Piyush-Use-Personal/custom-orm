const { DatabaseOperations } = require('./index')

class Project extends DatabaseOperations {
    constructor() {
        super('projects')
        this.USER = {
            table: 'users',
            pivot: 'users_projects_pivot',
            pk: 'project_id',
            fk: 'user_id',
            fk_pivot: 'user_id',
            key: 'project_id',
            select: ['user_id', 'email', 'data']
        }
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