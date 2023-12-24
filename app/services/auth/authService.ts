import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Pour l'inscription des utilisateurs
interface CreateUserArgs {
  email: string;
  password: string;
}

export async function createUser({ email, password }: CreateUserArgs) {
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash
      }
    });

    return user;
  } catch (error) {
    throw new Error("Impossible de créer l'utilisateur.");
  }
}

// Pour la connexion des utilisateurs
interface LoginUserArgs {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginUserArgs) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Mot de passe incorrect');
  }

  return user;
}
