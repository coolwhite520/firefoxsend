const storage = require('../storage');

module.exports = async function(req, res) {
  try {
    let retArr = [];
    let arr = await storage.redis.keysAsync('*');
    // console.log(arr);
    for (let item of arr) {
      let {
        url,
        name,
        size,
        createdAt,
        expiresAt,
        dlimit,
        dtotal
      } = await storage.redis.hgetallAsync(item);
      if (dlimit <= dtotal) {
        await storage.del(item);
        continue;
      }
      retArr.push({
        url,
        name,
        size,
        createdAt,
        expiresAt,
        dlimit,
        dtotal,
        id: item
      });
    }
    return res.json(retArr);
  } catch (e) {
    res.sendStatus(404);
  }
};
