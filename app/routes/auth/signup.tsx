import { json, redirect } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import { createUser } from '~/services/auth/authService';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // TODO: Valider les données d'entrée

  try {
    await createUser({ email, password });
    return redirect('/login');
  } catch (error) {
    return json({ error: error.message });
  }
}

export default function Signup() {
  const actionData = useActionData();

  return (
    <div>
      <h1>Inscription</h1>
      <Form method="post">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" name="password" required />
        </div>
        {actionData?.error && <p>{actionData.error}</p>}
        <button type="submit">S'inscrire</button>
      </Form>
    </div>
  );
}
