const requiredEnvVars = [
  'SECRET_KEY',
  'MONGO_USER',
  'MONGO_PW',
  'MONGO_HOST',
  'MONGO_DB'
];

const checkRequired = () => {
  requiredEnvVars.forEach(requiredEnvVar => {
    if (!process.env[requiredEnvVar])
      throw new Error(`${requiredEnvVar} environment variable is required`);
  });
};

const checkEnv = () => {
  checkRequired();
};

export default checkEnv;
