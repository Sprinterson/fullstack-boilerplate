import { json, redirect, ActionFunction } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import { createUser } from '~/services/auth/authService'; // Assurez-vous que ce chemin est correct

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // TODO: Valider les données d'entrée

  try {
    await createUser({ email, password });
    return redirect('/login');
  } catch (error) {
    // Assurer que 'error' est une instance d'Error
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 });
    }
    // Gérer le cas où 'error' n'est pas une instance d'Error
    return json({ error: 'Une erreur inconnue est survenue' }, { status: 500 });
  }
};

export default function Signup() {
  const actionData = useActionData<typeof action>();

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
