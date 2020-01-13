const create = (repository) => async (req, res) => {
  try {
    const payload = { ...req.payload };

    const user = await repository.create(payload, req.infraVersion);

    return res.finish(user);
  } catch (err) {
    return res.error(err);
  }
};

module.exports = create;
