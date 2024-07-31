import { JWTSECRET } from "../config/envs";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import userRepository from "../repositories/UserRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/emailUtils";

const saltRounds = 10;

export const getUsersService = async (): Promise<User[]> => {
  return await userRepository.find({
    relations: { appointments: true },
  });
};

export const getUserByIdService = async (id: string): Promise<User | null> => {
  return await userRepository.findOne({
    where: { id },
    relations: ['appointments'],
  });
};

export const registerUserService = async (
  userData: UserDto
): Promise<User> => { 
  const { email, password, confirmPassword } = userData;

  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = userRepository.create({ ...userData, password: hashedPassword });
    const name = newUser.name;

    await sendEmail(email, "Registro de usuario", "registration", { name });
    return await userRepository.save(newUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error("Error al crear el usuario");
  }
};

export const loginUserService = async (
  email: string,
  password: string,
  rememberMe: boolean
): Promise<{ login: boolean; user?: User; message?: string; token?: string }> => {
  try {
    const user = await userRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { login: false, message: "Credenciales incorrectas" };
    }

    if (!JWTSECRET) {
      throw new Error("JWTSECRET no está definido en las variables de entorno.");
    }
    
    const payload = { id: user.id, email: user.email, role: user.role };
    const expiresIn = rememberMe ? "30d" : "12h";
    const token = jwt.sign(payload, JWTSECRET, { expiresIn });

    return { login: true, user, message: "Login exitoso", token };
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    throw new Error("Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
  }
};
