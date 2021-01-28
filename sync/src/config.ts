export default {
   database: {
      uri: `mongodb://${process.env.DB_USER}:${process.env.DB_USER_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      options: {
         keepAlive: 3000,
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      }
   },
   gitlab: {
      token: process.env.GITLAB_TOKEN,
      baseUrl: `https://gitlab.com/api/v4/projects/${process.env.GITLAB_PROJECT}/`
   }
};
