'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('pages', {
    columns: {
      page_id: { type: 'int', primaryKey: true, autoIncrement: true },
      project_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'project_variant_project_id_fk',
          table: 'projects',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'project_id'
        }
      },
      data: { type: 'JSONB', notNull: true, },
      created_at: { type: 'datetime', defaultValue: new String('CURRENT_TIMESTAMP'), notNull: true },
    },
    ifNotExists: true
  });
};

exports.down = function (db) {
  return db.dropTable('pages');
};

exports._meta = {
  "version": 1
};
