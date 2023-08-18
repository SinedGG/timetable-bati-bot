module.exports = {
  apps: [
    {
      name: "timetable-bati-bot",
      cwd: "/home/ubuntu/pm/timetable-bati-bot",
      script: "index.js",
      watch: true,
      watch_delay: 5000,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      ignore_watch: ["temp"],

      env: {
        TG_TOKEN: "",

        DATABASE_URL: "",

        TIMETABLE_URL: "",
      },
    },
  ],
};
