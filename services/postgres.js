const { Pool } = require("pg");

class ServicioPG {
  constructor() {
    this.pool = new Pool({
      user: process.env.USERDB,
      host: process.env.HOSTDB,
      database: process.env.DB,
      password: process.env.PWDB,
      port: process.env.PORT,
    });
  }

  async ejecutarSql(sql) {
    let respuesta = await this.pool.query(sql);
    return respuesta;
  }

  async ejecutarSql(sql, valores) {
    let respuesta = await this.pool.query(sql, valores);
    return respuesta;
  }
}

module.exports = ServicioPG;
