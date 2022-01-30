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
  return db.createTable('projects', {
    columns: {
      project_id: { type: 'int', primaryKey: true, autoIncrement: true },
      user_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'user_variant_user_id_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'user_id'
        }
      },
      data: { type: 'JSONB', notNull: true, },
      created_at: { type: 'datetime', defaultValue: new String('CURRENT_TIMESTAMP'), notNull: true },
    },
    ifNotExists: true
  });
};

exports.down = function (db) {
  return db.dropTable('projects');
};

exports._meta = {
  "version": 1
};
