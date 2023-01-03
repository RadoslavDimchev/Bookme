async function login(username, password) {
  return new Promise((res, rej) => {
    if (username.toLowerCase() === 'peter' && password === '123') {
      res({
        _id: '1023647629436a',
        username: 'Peter',
        roles: ['user']
      });
    } else {
      rej(new Error('Incorrect username or password'));
    }
  });
}

module.exports = {
  login
};