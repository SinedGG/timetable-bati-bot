module.exports = {
  apps: [
    {
      name: "advoshyi-tools",
      cwd: "/home/ubuntu/pm/advoshyi-tools",
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
