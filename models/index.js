const pool = require("../config");

class DatabaseOperations {
  constructor(table) {
    this.table = table;
  }

  async includeBuilder(input, option) {
    const { table, pivot, pk, fk, fk_pivot, key, select = [] } = option
    const promiser = []
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const query = QueryBuilder.build.innerJoin(table, pivot, pk, fk, fk_pivot, item[key], select)
      promiser.push(pool.query(query))
    }
    return Promise.all(promiser)

  }

  async include(options, data) {
    const db = this;
    const response = await db.get(data)

    // return if no record
    if(!response.length) return []
    
    const promisers = options.map(function (option) {
      return db.includeBuilder(response, option)
    })
    const outputs = await Promise.all(promisers)
    const newResponse = []
    for (let i = 0; i < response.length; i++) {
      const item = response[i];
      const join = {}
      for (let j = 0; j < outputs.length; j++) {
        const output = outputs[j];
        const option = options[j];
        join[option.table] = output[i].rows
      }
      newResponse.push({
        ...item,
        ...join
      })
    }
    if(data.top) return newResponse[0]
    return newResponse
  }

  get(data = {}) {
    const sql = QueryBuilder.build.filter(this.table, data);
    return new Promise((resolve, reject) => {
      pool.query(sql, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data.rows);
        }
      });
    });
  }

  save(data) {
    const sql = QueryBuilder.build.save(this.table, data);
    return new Promise((resolve, reject) => {
      pool.query(sql, Object.values(data), (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.rows);
        }
      });
    });
  }

  update(data, where) {
    const sql = QueryBuilder.build.update(this.table, data, where);
    return new Promise((resolve, reject) => {
      pool.query(sql, Object.values(data), (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.rows);
        }
      });
    });
  }

  deleteOne(id) {
    const sql = `DELETE FROM ${this.table} WHERE id = ?`;
    return new Promise((resolve, reject) => {
      pool.query(sql, [this.table, id], function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

const QueryBuilder = {
  build: {
    save: (name, data) => {
      const vIterator = Object.keys(data).map((i, idx) => `$${idx + 1}`).join(',')
      const keys = Object.keys(data).join(',')
      return `INSERT INTO ${name} (${keys}) VALUES (${vIterator})`
    },
    filter: (name, { columns, where }) => {
      let conditions = '';

      // If there is a condition object build query using keys and values
      if (where) {
        const conditionKeys = Object.keys(where);
        const conditionValues = Object.values(where).map((value) => 
          (typeof value === 'string' ? `'${value}'` : value)
        );
        conditionKeys.forEach((key, index) => {
          conditions += `${key} = ${conditionValues[index]}
          ${index === conditionKeys.length - 1 ? '' : ' AND '}`;
        });
      }

      let query = `SELECT ${columns ? columns.join() : '*'} FROM ${name}`;
      if (conditions) query += ` WHERE ${conditions}`;
      return query;
    },
  }
}
module.exports = {
  DatabaseOperations,
  QueryBuilder
}
