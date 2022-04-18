exports.createPlayer = function(req, res) {
  console.log(req.body);
  const id = 1111;
  res.json({ message: 'Player created! ' + id });
  res.render('start');
  }
exports.finishGame = function(req, res) {
    const body = req.body;
  }