//FIXME: ALTERAR VALORES DE CONFIGURAÇÃO PARA OS DO BANCO A SEREM UTILIZADOS
const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  POSTGRES_DB = 'finances',
  POSTGRES_USER = 'postgres',
  POSTGRES_PASSWORD = 'Diffind0',
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

