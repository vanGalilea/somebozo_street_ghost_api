const photos = require('./photos/photos.service.js');
const users = require('./users/users.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(photos);
  app.configure(users);
};
