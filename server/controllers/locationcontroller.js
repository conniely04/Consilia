const Location = require("../schemas/location");
//curl test
// curl -X POST http://localhost:5001/api/locations \
// -H "Content-Type: application/json" \
// -d '{
//       "name": "Central Park",
//       "address": "New York, NY, USA",
//       "geo": {
//         "type": "Point",
//         "coordinates": [-73.965355, 40.782865]
//       }
//     }'

exports.createLocation = async (req, res) => {
  try {
    const { name, address, geo } = req.body;
    const location = new Location({ name, address, geo });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
