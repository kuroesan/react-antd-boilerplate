const user = {
  'GET /api/user': {
    id: 1,
    username: 'good',
    sex: 6
  },
  'POST /api/auth/login': (req, res) => {
    let param = req.body;
    if (param.username === 'admin' && param.password === 'admin') {
      res.send({ code: 200, msg: '登录成功' });
    } else {
      res.send({ code: 0, msg: '账号或密码错误' });
    }

  }
};


module.exports = user;