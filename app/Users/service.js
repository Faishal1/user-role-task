import knex from "../../database/index";

/**
 * Finding user with provided query params
 * @property {object} query - object containing params to prepare query.
 * @returns {records[]}
 */
async function findUser({ query }) {
  const res = await knex
    .from("users")
    .select()
    .where(query);
  return res;
}

/**
 * Creating user record
 * @property {object} data - record properties.
 * @returns {record}
 */
async function createUser({ data }, transaction) {
  const res = await knex("users")
    .insert(data)
    .transacting(transaction);
  return { status: 201, data: res, message: "Created Successfully" };
}

/**
 * Creating user role record
 * @property {object} data - record properties.
 * @returns {record}
 */
async function createUserRole({ data }, transaction) {
  const res = await knex("user_roles")
    .insert(data)
    .transacting(transaction);
  return { status: 201, message: "Created Successfully" };
}

/**
 * Creating user role record
 * @property {object} data - record properties.
 * @returns {record}
 */
async function findUserAndRole({ query }) {
  const res = await knex
    .from("users as u")
    .innerJoin("user_roles as ur", "ur.user_id", "u.id")
    .select()
    .where("u.id", query.id);
  return res[0];
}

export default { findUser, createUser, createUserRole, findUserAndRole };
