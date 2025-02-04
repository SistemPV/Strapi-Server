const bcrypt = require('bcryptjs');

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
  }
};
