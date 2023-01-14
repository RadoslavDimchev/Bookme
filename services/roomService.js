const Room = require('../models/Room');


function getAll(search, city, fromPrice, toPrice) {
  return Room.find({}).lean();
}

function getById(id) {
  return Room.findById(id).populate('facilities').lean();
}

function getByIdRaw(id) {
  return Room.findById(id).populate('facilities');
}

async function create(roomData, ownerId) {
  const room = {
    name: roomData.name,
    description: roomData.description,
    city: roomData.city,
    beds: Number(roomData.beds),
    price: Number(roomData.price),
    imgUrl: roomData.imgUrl,
    owner: ownerId
  };

  const missing = Object.entries(room).filter(([k, v]) => !v);
  if (missing.length > 0) {
    throw new Error(missing.map(m => `${m[0]} is required!`).join('\n'));
  }

  return Room.create(room);
}

async function update(room, roomData) {
  const missing = Object.entries(roomData).filter(([k, v]) => !v);
  if (missing.length > 0) {
    throw new Error(missing.map(m => `${m[0]} is required!`).join('\n'));
  }

  room.name = roomData.name;
  room.description = roomData.description;
  room.city = roomData.city;
  room.beds = Number(roomData.beds);
  room.price = Number(roomData.price);
  room.imgUrl = roomData.imgUrl;

  await room.save();
  return room;
}

async function deleteById(roomId) {
  return Room.findByIdAndRemove(roomId);
}

module.exports = {
  getAll,
  getById,
  getByIdRaw,
  create,
  update,
  deleteById
};