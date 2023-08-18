module.exports = {
  name: "start",
  async execute(ctx) {
    const create = require("../models/user").create;

    try {
      await create(
        ctx.from.id,
        ctx.from.username,
        ctx.from.first_name,
        ctx.from.last_name
      );
      console.log(`User ${ctx.from.id} added to database.`);
      ctx.reply(
        "Чудово! Тепер ви будете отримувати свіжий розклад одразу після його публікації⚡️"
      );
    } catch (err) {
      if (err.code == "P2002") {
        ctx.reply("Здається ви вже є у базі даних.");
        console.log(`User ${ctx.from.id} already exists in database.`);
      } else console.log(err);
    }
  },
};
