import { DataTypes, Sequelize, Model } from 'sequelize';

export const userSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dcId: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  osId: {
    type: DataTypes.STRING(36), // uuid
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Can't put ON UPDATE CURRENT_TIMESTAMP as it will be used when creating a new row, resulting in syntax error
  },
};

const FIELDS_TO_REMOVE = ['createdAt', 'updatedAt'];
export class User extends Model {
  public id!: string;
  public dcId: string;
  public osId: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  [key: string]: any;

  public toJSON() {
    const retVal: any = Object.assign({}, this.get());

    FIELDS_TO_REMOVE.forEach((f) => {
      delete retVal[f];
    });
    return retVal;
  }
}

export const init = (sequelize: Sequelize) => {
  User.init(userSchema, {
    sequelize,
    tableName: 'ls_user',
    underscored: true,
  });
};
