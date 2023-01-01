const Facility = require('../models/Facility');


async function getAllFacilities() {
  return Facility.find({});
}

async function createFacility(label, iconUrl) {
  return Facility.creare({
    label,
    iconUrl
  });
}

module.exports = {
  getAllFacilities,
  createFacility
};