module.exports = {
  apps: [
    {
      name: "bati-bot",
      cwd: "/home/ubuntu/pm/timetable-bati-bot",
      script: "index.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",

      env: {
        TG_TOKEN: "",

        DATABASE_URL: "",

        TIMETABLE_URL: "",
      },
    },
  ],
};
