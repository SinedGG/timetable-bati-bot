module.exports = {
  name: "id",
  async execute(ctx) {
    ctx.reply(`Ваш id: ${ctx.from.id}`);
  },
};
