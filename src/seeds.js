const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');
const seedsIgnore = require('./seedsIgnore');

const user = seedsIgnore.user;

const photos = [
  {
    originalTitle: 'Pussy Heaven',
    original: 'http://res.cloudinary.com/dqmqi1nxq/image/upload/v1501092751/pbqifmsdj2wlroqn9htu.jpg',
    thumbnail: 'http://res.cloudinary.com/dqmqi1nxq/image/upload/c_scale,w_150/v1501092751/pbqifmsdj2wlroqn9htu.jpg',
    description: 'Awesome Heaven, you better believe it'
  },
  {
    originalTitle: 'Alien Butterfly',
    original: 'http://res.cloudinary.com/dqmqi1nxq/image/upload/v1501092681/v28jlgkhhavgxg9i5fht.jpg',
    thumbnail: 'http://res.cloudinary.com/dqmqi1nxq/image/upload/c_scale,w_150/v1501092681/v28jlgkhhavgxg9i5fht.jpg',
    description: 'Awesome Heaven, you better believe it'
  }
];

const feathersClient = feathers();


feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
  .then(() => {
    feathersClient.authenticate({
      strategy: 'local',
      email: user.email,
      password: user.password
    })
      .then(() => {
        photos.map((photo) => {
          feathersClient.service('photos').create(photo)
            .then((result) => {
              console.log('Photo seeded...', result.originalTitle);
            }).catch((error) => {
              console.error('Error seeding photo!', error.message);
            });
        })
      })
      .catch(function(error){
        console.error('Error authenticating!', error);
      });
  })
  .catch(function(error) {
    console.error('Error creating user!');
  });
