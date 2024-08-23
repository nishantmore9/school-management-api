import { db } from "./db.js";

const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (
    !name || !address || typeof latitude !== "number" || typeof longitude !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  const sql =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  });
};

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;
  if (
    typeof parseFloat(latitude) !== "number" ||
    typeof parseFloat(longitude) !== "number"
  ) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  const userLat = parseFloat(latitude);
  const userLng = parseFloat(longitude);

  const sql = "SELECT id, name, address, latitude, longitude FROM schools";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message});
    }
    const schools = results.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        school.latitude,
        school.longitude
      );
      return { ...school };
    });

    schools.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schools);
  });
}

export {addSchool, listSchools}