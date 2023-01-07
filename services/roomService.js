const Room = require('../models/Room');


function getAll(search, city, fromPrice, toPrice) {
  return Room.find({}).lean();
}

function getById(id) {
  return Room.findById(id).populate('facilities').lean();
}

async function create(roomData, ownerId) {
  const room = {
    name: roomData.name.trim(),
    description: roomData.description.trim(),
    city: roomData.city.trim(),
    beds: Number(roomData.beds.trim()),
    price: Number(roomData.price.trim()),
    imgUrl: roomData.imgUrl.trim(),
    owner: ownerId
  };

  const missing = Object.entries(room).filter(([k, v]) => !v);
  if (missing.length > 0) {
    throw new Error(missing.map(m => `${m[0]} is required!`).join('\n'));
  }

  const result = await Room.create(room);
  return result;
}

async function update(roomId, roomData) {
  const missing = Object.entries(roomData).filter(([k, v]) => !v);
  if (missing.length > 0) {
    throw new Error(missing.map(m => `${m[0]} is required!`).join('\n'));
  }

  const room = await Room.findById(roomId);

  room.name = roomData.name.trim();
  room.description = roomData.description.trim();
  room.city = roomData.city.trim();
  room.beds = Number(roomData.beds.trim());
  room.price = Number(roomData.price.trim());
  room.imgUrl = roomData.imgUrl.trim();

  await room.save();

  return room;
}

async function deleteById(roomId) {
  return Room.findByIdAndRemove(roomId);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};