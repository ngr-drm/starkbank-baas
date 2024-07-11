import starkbank from 'starkbank';
import { vars } from '../../env-vars';

export const project = new starkbank.Project({
  environment: 'sandbox',
  id: vars.SANDBOX_PROJECT_ID,
  privateKey: vars.SANDBOX_PRIVATE_KEY,
});
