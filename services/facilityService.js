const Facility = require('../models/Facility');


async function getAllFacilities() {
  return Facility.find({}).lean();
}

async function createFacility(label, iconUrl) {
  return Facility.create({
    label,
    iconUrl
  });
}

async function addFacilities(roomId, facilityId) {

}

module.exports = {
  getAllFacilities,
  createFacility,
  addFacilities
};