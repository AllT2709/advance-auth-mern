exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got access in the private data in this route",
  });
};
