const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');
const seedsIgnore = require('./seedsIgnore');

const user = seedsIgnore.user;

const photos = [
  {
    title: 'Pussy Heaven',
    url: 'https://scontent.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/19932379_1799274620364822_3705518103031971840_n.jpg'
  },
  {
    title: 'King Toast',
    url: 'https://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p750x750/19624148_1406039082812044_4535798842569785344_n.jpg',
    featured: true
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
              console.log('Photo seeded...', result.title);
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
