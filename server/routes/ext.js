const storage = require('../storage');

module.exports = async function(req, res) {
  try {
    const { url, name, size, createdAt, expiresAt, dlimit, dtotal} = req.body;
    await storage.setField(req.params.id, "url", url);
    await storage.setField(req.params.id, "name", name);
    await storage.setField(req.params.id, "size", size);
    await storage.setField(req.params.id, "createdAt", createdAt);
    await storage.setField(req.params.id, "expiresAt", expiresAt);
    await storage.setField(req.params.id, "dlimit", dlimit);
    await storage.setField(req.params.id, "dtotal", dtotal);
    return res.sendStatus(200);
  } catch (e) {
    res.sendStatus(404);
  }
};
