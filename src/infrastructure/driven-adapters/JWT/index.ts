import { JWTHandler } from '@domain/utils/jwtHandler';
import { sign, verify } from 'jsonwebtoken';

export class JWTHandlerImpl implements JWTHandler {
    private readonly SECRET: string = process.env.SECRET || '';
    private readonly EXPIRESIN: string = '30m';

    generateAccessToken(user: string): string {
        return sign({ user }, this.SECRET, { expiresIn: this.EXPIRESIN });
    }

    validateAccessToken(accessToken: string | undefined): boolean {
        if (!accessToken) return false;
        const validToken = verify(accessToken, this.SECRET);
        return validToken !== undefined;
    }
}
