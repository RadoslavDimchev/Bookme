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

async function addFacilities(room, facilityIds) {
  const facilities = await Facility.find({ _id: { $in: facilityIds } });

  // Remove room ref from removed facilities
  const toRemove = room.facilities.filter(f => facilities.every(x => x._id.toString() !== f._id.toString()));
  console.log('To remove', toRemove.map(x => x.label));
  toRemove.forEach(f => {
    // Remove room from facility
    f.rooms.splice(f.rooms.findIndex(rId => rId.toString() === room._id.toString()), 1);
    // Remove facility from room
    room.facilities.splice(room.facilities.findIndex(x => x._id.toString() === f._id.toString()), 1);
  });

  // New facilities
  const newlyAdded = facilities.filter(f => room.facilities.every(x => x._id.toString() !== f._id.toString()));
  console.log('New', newlyAdded.map(x => x.label));

  // Add room ref to newly added facilities
  newlyAdded.forEach(f => {
    room.facilities.push(f);
    f.rooms.push(room);
  });

  await room.save();
  await Promise.all(toRemove.map(f => f.save()));
  await Promise.all(newlyAdded.map(f => f.save()));
}

module.exports = {
  getAllFacilities,
  createFacility,
  addFacilities
};