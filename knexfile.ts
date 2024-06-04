import type { Knex } from "knex";

const config: {[k:string]:Knex.Config}= {
  production:{
    client:'pg',
    connection:process.env.POSTGRES_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./db"
    }
  },
  development:{
    client:'sqlite3',
    connection:{filename:'./db.sqlite3'},
    useNullAsDefault:true,
    migrations: {
      directory: "./db"
    }
  }
}
export default config
