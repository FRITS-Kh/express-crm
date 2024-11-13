import {
  addNewContact,
  getContactById,
  getContacts,
  updateContact,
} from '../controllers/crm';

const routes = (app) => {
  app
    .route('/contact')
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getContacts)
    .post(addNewContact);

  app
    .route('/contact/:contactId')
    .get(getContactById)
    .put(updateContact)
    .delete((req, res) => res.send('DELETE request successful!'));
};

export default routes;
