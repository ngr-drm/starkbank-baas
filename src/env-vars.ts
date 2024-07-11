import * as env from 'env-var';

export const vars = {
  DB_HOST: env.get('PG_HOST').required().asString(),
  DB_USER: env.get('PG_USER').required().asString(),
  DB_PASSWORD: env.get('PG_PASSWORD').required().asString(),
  DB_DATABASE: env.get('PG_DATABASE').required().asString(),
  DB_PORT: env.get('PG_PORT').required().asPortNumber(),
  API_PORT: env.get('API_PORT').required().asPortNumber(),
  SANDBOX_PRIVATE_KEY: env.get('SANDBOX_PRIVATE_KEY').required().asString(),
  SANDBOX_PROJECT_ID: env.get('SANDBOX_PROJECT_ID').required().asString(),
  SANDBOX_BASE_URL: env.get('SANDBOX_BASE_URL').required().asString(),
  MIN_NUMBER_INVOICE: env.get('MIN_NUMBER_INVOICE').required().asInt(),
  MAX_NUMBER_INVOICE: env.get('MAX_NUMBER_INVOICE').required().asInt(),
  BANK_CODE: env.get('BANK_CODE').required().asString(),
  BRANCH: env.get('BRANCH').required().asString(),
  ACCOUNT: env.get('ACCOUNT').required().asString(),
  NAME: env.get('NAME').required().asString(),
  TAX_ID: env.get('TAX_ID').required().asString(),
  ACCOUNT_TYPE: env.get('ACCOUNT_TYPE').required().asString(),
};
