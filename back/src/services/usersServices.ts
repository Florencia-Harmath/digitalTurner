import UserDto from "../dto/UserDto";
import  {createCredential, validateCredentials} from "./credentialsServices"
import { User } from "../entities/User";
import userRepository from "../repositories/UserRepository";

//OBTENER TODOS LOS USUARIOS
export const getUsersService = async (): Promise<User[]> => {
  const users = await userRepository.find({
    relations: {
      appointments: true
    },
  });
  return users;
};

//OBTENER USUARIO POR ID
export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await userRepository.findOne({ where: { id }, relations: ['appointments'] });
  return user;
};


//CREAR USUARIO
export const registerUserService = async (
  userData: UserDto
): Promise<User> => { 
  try {
    //ANTES DE CREAR EL USUARIO SE CREA LA CREDENCIAL
    const credentialsId = await createCredential(userData.username, userData.password);
    //SE CREA EL NUEVO USUARIO
    const createNewUser = await userRepository.create({
      name: userData.name,
      email: userData.email,
      birthdate: userData.birthdate,
      nDni: userData.nDni,
      credentialsId: credentialsId
    }); 
    //SE GUARDA EL NUEVO USUARIO
    const newUser = await userRepository.save(createNewUser);
    //SE RETORNA EL NUEVO USUARIO
    return newUser; 
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear el usuario");
  }
};


//INICIAR / CERRAR SESION
//aca estaria la validacion de las credenciales

export const loginUserService = async (username: string, password: string): Promise<{ login: boolean, user?: UserDto }> => {
  try {
    const credentialId = await validateCredentials(username, password);

    if (!credentialId) {
      return { login: false };
    }

    const user = await userRepository.findOne({ where: { credentialsId: credentialId }, relations: ['appointments'] });

    if (!user) {
      return { login: false };
    }

    const userDto: UserDto = {
      id: user.id,
      username: username,
      password: password,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      nDni: user.nDni,
    };

    return { login: true, user: userDto };
  } catch (error) {
    console.error(error);
    throw new Error("Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
  }
};

