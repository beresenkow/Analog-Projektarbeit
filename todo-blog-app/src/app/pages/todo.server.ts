import {
  type PageServerAction,
  json,
  fail,
} from '@analogjs/router/server/actions';
import { readFormData } from 'h3';

export async function action({ event }: PageServerAction) {
  const body = await readFormData(event);
  const title = body.get('title') as string;
  const description = body.get('description') as string;
  const action = body.get('action') as string;

  if (!title) {
    return fail(422, { title: 'A title for a new Todo is required' });
  }

  if (!description) {
    return fail(422, { description: 'A description for a new Todo is required' });
  }

  return json({ type: 'success' });
}


