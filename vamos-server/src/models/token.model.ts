import { Model } from "sequelize";

interface TokenAttributes{
    tokenId : number;
    userId: number;
    tokenType: string;
    tokenValue: string;
    createdAt: Date;
    expiresIn: Date | null
}

class Token extends Model<TokenAttributes> implements TokenAttributes {
    public tokenId!: number;
    public userId!: number;
    public tokenType!: string;
    public tokenValue!: string;
    public createdAt!: Date;
    public expiresIn!: Date | null;
}

export { Token}