import bcrypt from "bcrypt";

export const bcryptPasswordCompare = async (password: string, hashedPassword: string) => {
    await bcrypt.compare(password, hashedPassword);
}

export const bcryptPasswordHash = async (password: string) => {
    const bcryptSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS as string);
    return await bcrypt.hash(password, bcryptSaltRounds);
}