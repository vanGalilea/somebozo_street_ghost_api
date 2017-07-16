// photos-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const photos = new Schema({
    title:       { type: String, default: 'no title' },
    description: { type: String, required: false },
    url:         { type: String, required: true },
    featured:    { type: Boolean, default: false },
    createdAt:   { type: Date, default: Date.now },
    updatedAt:   { type: Date, default: Date.now }
  });

  return mongooseClient.model('photos', photos);
};
