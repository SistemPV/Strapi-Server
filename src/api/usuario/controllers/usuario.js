const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async login(ctx) {
    const { username, password } = ctx.request.body;
    
    if (!username || !password) {
      return ctx.badRequest('Faltan datos');
    }

    // Buscar usuario en la colección "Usuario"
    const users = await strapi.entityService.findMany('api::usuario.usuario', {
      filters: {
        $or: [
          { username: username }
        ]
      }
    });

    if (!users || users.length === 0) {
      return ctx.unauthorized('Usuario no encontrado');
    }

    const usuario = users[0];

    // Comparar la contraseña hasheada con la ingresada
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return ctx.unauthorized('Contraseña incorrecta');
    }

    // Generar token JWT
    const token = jwt.sign({ id: usuario.id }, strapi.config.get('plugin.users-permissions.jwtSecret'), {
      expiresIn: '7d'
    });

    return {
      jwt: token,
      user: {
        id: usuario.id,
        username: usuario.username,
        identification: usuario.identification,
        name: usuario.name,
        lastname: usuario.lastname,
        cargo: usuario.cargo,
        role: usuario.role,
        status: usuario.estatus
      }
    };
  }
};
