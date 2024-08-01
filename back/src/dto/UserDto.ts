interface UserDto {
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    password: string
    confirmPassword: string
    profilePicture?: string;
}

export default UserDto;

