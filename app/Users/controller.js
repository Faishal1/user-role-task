import service from "./service";
import knex from "../../database/index";
import {
  INTERNAL_SERVER_ERROR,
  USER_CREATED,
  PARAMETERS_REQUIRED,
  roles,
  ALREADY_EXISTS,
  ROLE_REQUIRED
} from "../../helpers/contants";
import validator from '../../helpers/validator';

/**
 * Create new record
 * @property {string} body.name - The name of record.
 * @property {string} body.email - The email of record.
 * @property {string} body.username - The username of record.
 * @returns {Object}
 */
async function createUser(body) {
  // Validating body
  const validData = await validator.schema.validate({body});
  // Reassigning the validData
  const validBody = validData.body;
  // Looking for the existing user record
  const existingRec = await service.findUser({
    query: {}
  });
  const userObj = validBody;
  const roleObj = {};
  // If first user then making him an admin
  if (!existingRec.length) {
    roleObj.role = roles[0];
    delete validBody.role;
  } else {
    // validating if role exists or not
    if (!validBody.role) {
      return {
        status: 400,
        message: ROLE_REQUIRED
      };
    }
    // Looking for the existing user with same name
    const existing = await service.findUser({ query: { name: validBody.name, mobile_number: validBody.mobile_number } });
    if (existing.length) {
      return {
        status: 409,
        message: ALREADY_EXISTS
      };
    }
    roleObj.role = validBody.role;
    delete userObj.role;
  }
  // Creating a new transaction
  const transaction = await getTransaction();
  try {
    // Creating a new user record
    const newUserRec = await service.createUser({ data: userObj }, transaction);
    roleObj.user_id = newUserRec.data[0];
    // Assigning user a role
    await service.createUserRole({ data: roleObj }, transaction);
    // Commiting the changes
    transaction.commit();
    // Looking for the existing user with same name
    const newRec = await service.findUserAndRole({
      query: { id: newUserRec.data[0] }
    });
    return {
      status: 201,
      data: newRec,
      message: USER_CREATED
    };
  } catch (err) {
    // Rollback the changes
    transaction.rollback();
    return {
      status: 500,
      message: INTERNAL_SERVER_ERROR
    };
  }
}

const getTransaction = async () =>
  new Promise(resolve => knex.transaction(resolve));

export default { createUser };
