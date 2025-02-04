module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name:'strapi::cors',
    config: {
      enabled: true,
      origin: ['*'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  
];

