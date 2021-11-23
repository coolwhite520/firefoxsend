const storage = require('../storage');

module.exports = async function(req, res) {
  const id = req.params.id;
  try {
    const { dlimit, dtotal } = await storage.redis.hgetallAsync(id);
    let newValue = parseInt(dtotal) + 1;
    await storage.setField(id, 'dtotal', newValue);
    if (dlimit <= dtotal) {
      await storage.del(id);
      res.sendStatus(404);
      return;
    }

    const { length, stream } = await storage.get(id);
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': length
    });

    stream.pipe(res);
  } catch (e) {
    res.sendStatus(404);
  }
};
