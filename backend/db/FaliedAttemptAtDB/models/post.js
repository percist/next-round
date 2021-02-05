'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    image_url: {
      type: DataTypes.STRING(1000),
      default: "https://picsum.photos/seed/picsum/400/600"
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(2000)
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: "Rounds"}

    },
    // likesId: {
    //   type: DataTypes.INTEGER
    // }
  }, {});
  Post.associate = function(models) {
    // const columnMapping1 = {
    //   foreignKey: 'postId',
    //   through: 'Likes',
    //   otherKey: 'userId'
    // };
    const columnMapping2 = {
      foreignKey: 'postId',
      through: 'Comments',
      otherKey: 'userId'
    };
    // Post.belongsToMany(models.User, columnMapping1);
    Post.belongsToMany(models.User, columnMapping2);
    Post.belongsTo(models.Round, { foreignKey: "roundId"});
  };
  return Post;
};