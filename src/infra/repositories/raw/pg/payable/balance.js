const database = require('../../../../database/raw/pg');
const statusEnum = require('../../../../database/enums/payable/status');

const balance = async ({ userId, status }, infraVersion, env) => {
  const pool = database[infraVersion][env];

  const res = await pool.query(
    `SELECT SUM("payable"."value") AS "balance"
    FROM "payable"."payables" AS "payable"
    INNER JOIN "transaction"."transactions" AS "transaction"
    ON "payable"."transactionId" = "transaction"."id"
    INNER JOIN "users"."users" AS "transaction->users"
    ON "transaction"."userId" = "transaction->users"."id"
    AND "transaction->users"."id" = $1
    WHERE "payable"."statusId" = $2;`,
    [userId, statusEnum[status]],
  );

  return res.rows[0].balance;
};

module.exports = {
  balance,
};
