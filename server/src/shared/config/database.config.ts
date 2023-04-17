//FIXME: ALTERAR VALORES DE CONFIGURAÇÃO PARA OS DO BANCO A SEREM UTILIZADOS
const {
    DB_HOST = 'localhost',
    DB_PORT = '15434',
    POSTGRES_DB = 'user',
    POSTGRES_USER = 'postgres',
    POSTGRES_PASSWORD = '3ee3223c3513eb69dcc4913bf921ce7aa214f2dc',
  } = process.env;
  export const DATABASE_CONFIG_URI = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}`;
  
  export const DATABASE_CONFIG_OPTIONS = {
    logging: false,
    retry: {
      max: 3,
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
      ],
    },
    pool: {
      max: 20
    },
    define: {
      timestamps: true,
    },
  };
  