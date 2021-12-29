// import knex from 'knex'
//
// const connection = knex({
//   client: 'mysql',
//   asyncStackTraces: true,
//   debug: true,
//   connection: {
//     database: process.env.DATABASE,
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     ssl: true
//   }
// });


export default async function handler(_, res) {
  // try {
  //   const r = await connection.select('1+1').as('test')
  //   console.log({ r })
  // } catch (e) {
  //   console.log({e})
  // }

  res.status(200).json({ name: 'John Doe' })
}
