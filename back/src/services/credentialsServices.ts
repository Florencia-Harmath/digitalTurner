import ICredential from "../interfaces/ICredential";
import userRepository from "../repositories/UserRepository";

let credentials: ICredential[] = [];

export const createCredential = async (
  username: string,
  password: string
): Promise<number> => {
  try {
    const newCredential: ICredential = {
      id: credentials.length + 1,
      username,
      password,
    };
    credentials.push(newCredential);
    return newCredential.id;
  } catch (error) {
    throw new Error("Error al crear las credenciales");
  }
};

export const validateCredentials = async (
  username: string,
  password: string
): Promise<number | null> => {
  try {
    const credential = credentials.find(
      (credential) => credential.username === username
    );
    if (credential && credential.password === password) {
      return credential.id;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error al validar las credenciales");
  }
};
