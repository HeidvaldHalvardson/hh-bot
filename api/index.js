import { startVercel } from '../src';

export default async function handle() {
  try {
    await startVercel();
  } catch (e) {
    console.error(e.message);
  }
}