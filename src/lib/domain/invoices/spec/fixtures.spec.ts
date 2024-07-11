import { vars } from '../../../../env-vars';
import { generateRandomNumberOfInvoices, getRandomCustomer } from '../fixtures';

describe('Fixtures', () => {
  test('generate random number of invoices (according to the current rule)', async () => {
    const number = generateRandomNumberOfInvoices();
    expect(number).toBeGreaterThanOrEqual(vars.MIN_NUMBER_INVOICE);
    expect(number).toBeLessThanOrEqual(vars.MAX_NUMBER_INVOICE);

    expect.assertions(2);
  });
  test('get random customer sample', async () => {
    const customer = getRandomCustomer();
    expect(customer).toBeDefined();
    expect(customer).toHaveProperty('name');
    expect(customer).toHaveProperty('taxId');

    expect.assertions(3);
  });
});
