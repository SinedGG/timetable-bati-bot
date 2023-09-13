require("dotenv").config();
const { Telegraf } = require("telegraf"),
  bot = new Telegraf(process.env.TG_TOKEN);

require("./handler/command.js")(bot);

main();
async function main() {
  const user = require("./models/user");
  const vars = require("./models/vars");

  try {
    const oldFile = await vars.get("file-size");
    const newFile = await require("./modules/getFileSize.js")();

    if (oldFile.value != newFile.value) {
      const download = await require("./modules/downloadFile.js")();
      console.log(
        `Файл завантажено. Час отримання - ${download.elapsedTime} ms`
      );
      const day = await require("./modules/getPdfDay.js")();
      const lastDay = await vars.get("last-day");
      const users = await user.getAll();
      var text = "Новий розклад📚";
      if (day == lastDay.value) text = "Зміни в розкладі📚";
      if (day) text += `\nна ${day}`;
      vars.set("last-day", day);
      vars.set("file-size", newFile.value);
      for (let i = 0; i < users.length; i++) {
        console.log(`Спроба надсилання для ${users[i].tg_id}`);
        await bot.telegram
          .sendDocument(
            users[i].tg_id.toString(),
            { source: "./temp/zm.pdf" },
            { caption: text }
          )
          .catch((err) => {
            if (
              err.message.includes(
                "403: Forbidden: bot was blocked by the user"
              )
            ) {
              user.delete(users[i].tg_id.toString());
              console.log(
                `[DB] Користувача ${users[i].tg_id} видалено з бази даних у зв'язку з блокуванням.`
              );
            } else if (
              err.message.includes("429: Too Many Requests: retry after")
            ) {
              console.log("Too Many Requests");
            } else {
              console.log(err);
            }
          });
      }
    }
    setTimeout(() => {
      main();
    }, 30 * 1000);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      main();
    }, 60 * 1000);
  }
}

bot.launch();
