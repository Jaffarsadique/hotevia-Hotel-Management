import { readHotels, saveHotels } from "../utils/hotelStore.js";
import validateHotel from "../utils/validateHotel.js";

// only keep the fields we expect, and make sure numbers are numbers
function cleanHotel(data) {
  return {
    title: data.title.trim(),
    description: data.description.trim(),
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
    price: Number(data.price),
    image: data.image,
  };
}

export async function getHotels(req, res, next) {
  try {
    const hotels = await readHotels();
    res.json(hotels);
  } catch (err) {
    next(err);
  }
}

export async function getHotel(req, res, next) {
  try {
    const hotels = await readHotels();
    const hotel = hotels.find((h) => h.id === req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (err) {
    next(err);
  }
}

export async function createHotel(req, res, next) {
  try {
    const errors = validateHotel(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: Object.values(errors)[0], errors });
    }

    const hotels = await readHotels();
    const newHotel = { id: Date.now().toString(), ...cleanHotel(req.body) };
    hotels.unshift(newHotel);
    await saveHotels(hotels);

    res.status(201).json(newHotel);
  } catch (err) {
    next(err);
  }
}

export async function updateHotel(req, res, next) {
  try {
    const errors = validateHotel(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: Object.values(errors)[0], errors });
    }

    const hotels = await readHotels();
    const index = hotels.findIndex((h) => h.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    hotels[index] = { id: hotels[index].id, ...cleanHotel(req.body) };
    await saveHotels(hotels);

    res.json(hotels[index]);
  } catch (err) {
    next(err);
  }
}

export async function deleteHotel(req, res, next) {
  try {
    const hotels = await readHotels();
    const exists = hotels.some((h) => h.id === req.params.id);
    if (!exists) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    await saveHotels(hotels.filter((h) => h.id !== req.params.id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
