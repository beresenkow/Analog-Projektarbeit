import {
  type PageServerAction,
  json,
  fail,
  redirect,
} from '@analogjs/router/server/actions';
import { readFormData } from 'h3';

export async function action({ event }: PageServerAction) {
  const body = await readFormData(event);
  const email = body.get('email') as string;

  if (!email) {
    return fail(422, { email: 'Email is required' });
  }

  // In the server action, you can use access environment variables, read cookies, and perform other server-side only operations.

  return json({ type: 'success' });
  //return redirect('/');
}
