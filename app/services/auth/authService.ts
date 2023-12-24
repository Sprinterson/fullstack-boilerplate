import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface LoginUserArgs {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginUserArgs) {
  // Trouver l'utilisateur par email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Mot de passe incorrect');
  }

  // TODO: Gérer la création de la session

  return user;
}
