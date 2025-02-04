module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/usuario/login',
        handler: 'usuario.login',
        config: {
          auth: false
        }
      }
    ]
  };
  