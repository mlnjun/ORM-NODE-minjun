var Op = db.Sequelize.Op;

await db.Channel.findAll(
  {
    where:{category_code:{[Op.not]:0}},
    order:[['channel_id, ASC']],
    attributes:[channel_id, category_code, channel_name, reg_date]
  }
);