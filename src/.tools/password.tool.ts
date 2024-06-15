import * as crypto from 'crypto';

export class PasswordTool{
    static salt = '19CtJ6UrbxBYG0PgMUYkAg==';
    static count = 141;

    public static encrypt(password: string): string{
        let hashedPassword = password;
        
        for (let i = 0; i < this.count; i++){
            const hash = crypto.createHash('sha256');
            hash.update(password + this.salt);
            hashedPassword = hash.digest('hex');
        }
        
        return hashedPassword;
    }
}