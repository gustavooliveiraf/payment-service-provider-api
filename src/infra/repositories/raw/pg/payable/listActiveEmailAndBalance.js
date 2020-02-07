const database = require('../../../../database/raw/pg');
const statusEnum = require('../../../../database/enums/payable/status');

const listActiveEmailAndBalance = async (infraVersion, env) => {
  const pool = database[infraVersion][env];

  const res = await pool.query(
    `SELECT SUM("payable"."value") AS "balance", "users"."email" AS "email"
    FROM "payable"."payables" AS "payable"
    INNER JOIN "transaction"."transactions" AS "transaction"
    ON "payable"."transactionId" = "transaction"."id"
    INNER JOIN "users"."users" AS "users"
    ON "transaction"."userId" = "users"."id"
    WHERE "payable"."statusId" = $1
    GROUP BY email;`,
    [statusEnum.paid],
  );

  return res.rows;
};

module.exports = {
  listActiveEmailAndBalance,
};
