'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    image_url: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(2000)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: "Users",
      refereceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    likesId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Post.associate = function(models) {
    const columnMapping1 = {
      foreignKey: 'postId',
      through: 'Likes',
      otherKey: 'userId'
    };
    const columnMapping2 = {
      foreignKey: 'postId',
      through: 'Comments',
      otherKey: 'userId'
    };
    Post.belongsToMany(models.User, columnMapping1);
    Post.belongsToMany(models.User, columnMapping2);
    Post.belongsTo(models.User, { foreignKey: "postId"});
    Post.belongsTo(models.Round, { foreignKey: "postId"});
  };
  return Post;
};