interface UserDto {
    name: string,
    email: string,
    birthdate: Date,
    password: string
    confirmPassword: string
    profilePicture?: string;
}

export default UserDto;

