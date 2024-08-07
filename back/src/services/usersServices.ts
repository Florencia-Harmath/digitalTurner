import { JWTSECRET } from "../config/envs";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import userRepository from "../repositories/UserRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/emailUtils";
import { StatusUserEnum } from "../enum/statusUserEnum";
import UserPasswordUploadDto from "../dto/UserPasswordUploadDto";

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

export const registerUserService = async (userData: UserDto) => {
  const { name, email, birthdate, password, confirmPassword } = userData;

  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = userRepository.create({
      name,
      email,
      birthdate,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    await sendEmail(email, "Registro de usuario", "registration", { name });
    console.log("Mail enviado");

    return "Usuario creado exitosamente";
  } catch (error) {
    console.error("Error al registrar el usuario:", error);

    // Manejo seguro del error
    if (error instanceof Error) {
      let errorMessage = "Error al crear el usuario";
      if (error.message === "El email ya está registrado") {
        errorMessage = "El email ya está registrado";
      }
      throw new Error(errorMessage); 
    } else {
      throw new Error("Error inesperado al crear el usuario."); 
    }
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

export const updateProfilePictureService = async (userId: string, profilePicture: string): Promise<User | null> => {
  try {
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
          throw new Error("Usuario no encontrado");
      }

      user.profilePicture = profilePicture;
      await userRepository.save(user);

      return user;
  } catch (error) {
      console.error("Error al actualizar la foto de perfil:", error);
      throw new Error("Error al actualizar la foto de perfil");
  }
};

export const blockedUser = async (userId: string): Promise<void> => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    user.status = StatusUserEnum.BLOCKED;
    await userRepository.save(user);
}

export const unblockedUser = async (userId: string): Promise<void> => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    user.status = StatusUserEnum.ACTIVE;
    await userRepository.save(user);
}

export const uploadUserService = async (userId: string, userData: Partial<UserDto>): Promise<User> => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new Error("Usuario no encontrado"); 
    }
    Object.assign(user, userData);
    await userRepository.save(user);  
    return user;
}

export const uploadUserPasswordService = async (userId: string, userData: Partial<UserPasswordUploadDto>): Promise<User> => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new Error("Usuario no encontrado"); 
    }
    if(!userData.password || !userData.newPassword || !userData.confirmNewPassword) {
        throw new Error("Contraseña no puede estar vacía");
    }

    const passwordUser = await bcrypt.compare(userData.password, user.password);
    if (!passwordUser) {
        throw new Error("Contraseña incorrecta");
    }

    if (userData.newPassword !== userData.confirmNewPassword) {
        throw new Error("Las contraseñas no coinciden");
    }

    const newPassword = await bcrypt.hash(userData.newPassword, saltRounds);

    user.password = newPassword;
    await userRepository.save(user);
    
    return user;
}