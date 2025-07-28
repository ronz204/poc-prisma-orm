import bcrypt from "bcryptjs";

const HASH_ROUNDS = 10;

export class BcryptService {
  public static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, HASH_ROUNDS);
  };

  public static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  };
};