// import knex from 'knex'
// import dbConfig from '../../knexfile'
//
// const environmentConfig = dbConfig[process.env.ENV]
// const connection = knex(environmentConfig);

export default async function handler(_, res) {
  let r = []
  try {
    r = []
    // r = await connection.select('*').from('user')
  } catch (e) {
    console.log({ e })
  }

  res.status(200).json(r)
}
