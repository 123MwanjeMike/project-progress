export default function errorHandler(err, res) {
  if (err.response) {
    res.status(err.response.status).json({
      error: err.response.data.message,
    });
  }
  res.status(500).json({
    error: 'Server Error',
  });
}
