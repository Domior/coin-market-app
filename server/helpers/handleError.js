module.exports = (res, status, message) => {
  res.status(status).json({ message });
};
