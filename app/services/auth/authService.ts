import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface CreateUserArgs {
  email: string;
  password: string;
}

export async function createUser({
  email,
  password
}: CreateUserArgs): Promise<User> {
  // Valider les données d'entrée (à implémenter)

  // Hacher le mot de passe
  const passwordHash = await bcrypt.hash(password, 10);

  // Enregistrer l'utilisateur dans la base de données
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash
      }
    });

    return user;
  } catch (error) {
    // Gérer les erreurs, par exemple un email déjà utilisé
    throw new Error("Impossible de créer l'utilisateur.");
  }
}
