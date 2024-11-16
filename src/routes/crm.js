import {
  addNewContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../controllers/crm';
import { register, login, loginRequired } from '../controllers/user';

const routes = (app) => {
  app
    .route('/contact')
    .get(
      (req, res, next) => {
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      loginRequired,
      getContacts,
    )
    .post(loginRequired, addNewContact);

  app
    .route('/contact/:contactId')
    .get(loginRequired, getContactById)
    .put(loginRequired, updateContact)
    .delete(loginRequired, deleteContact);

  app.route('/auth/register').post(register);

  app.route('/login').post(login);
};

export default routes;
