export interface JWTHandler {
    generateAccessToken: (user: string) => string;
    validateAccessToken: (acessToken: string | undefined) => boolean;
}
