import starkbank from 'starkbank';
import { project } from '../project';

export async function query(params: { limit: number; isDelivered: boolean }) {
  try {
    return await starkbank.event.query({ limit: params.limit, isDelivered: params.isDelivered, user: project });
  } catch (err) {
    throw err;
  }
}
