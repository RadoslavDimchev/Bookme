const { Schema, model, Types: { ObjectId } } = require('mongoose');

const facilitySchema = new Schema({
  label: { type: String, required: true },
  iconUrl: { type: String, minLength: [10, 'Icon URL must be at least 10 character long!'] },
  rooms: { type: [ObjectId], default: [], ref: 'Room' }
});

const Facility = model('Facility', facilitySchema);

module.exports = Facility;