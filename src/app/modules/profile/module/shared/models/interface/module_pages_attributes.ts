import { Optional } from 'sequelize';

export interface ModulePagesAttributes {
    id: number;
    idModule: number;
    idPages: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ModulePagesCreationAttributes extends Optional<ModulePagesAttributes, 'id'> {}