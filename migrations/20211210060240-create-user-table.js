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
  return db.createTable('users', {
    columns: {
      user_id: { type: 'int', primaryKey: true, autoIncrement: true },
      email: { type: 'string', autoIncrement: true },
      data: { type: 'JSONB', notNull: true, },
      created_at: { type: 'datetime', defaultValue: new String('CURRENT_TIMESTAMP'), notNull: true },
    },
    ifNotExists: true
  });
};

exports.down = function (db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
