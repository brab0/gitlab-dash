import Request from './request';
import config from "./config";
import { Model } from './odm';
import Database from './database';
import { transform } from './label';

(async () => {
   const database = new Database(config.database);
   const request = new Request(config.gitlab.baseUrl);

   await database.connect();

   console.log('watching changes...');
   
   const watch = param => {
      const on = (now, cb) => {
         setTimeout(async () => {
            const issues: any = await request.setToken(config.gitlab.token).get(`issues?per_page=100&${param}=${now}`);

            if(!issues || issues && issues.length === 0) {
               on(now, cb);
            } else {
               console.log(`Found ${issues.length}: ${param} at ${now}`);
               
               await cb(issues.map(issue => Object.assign({}, issue, transform(issue.labels))));

               on(new Date(), cb);
            }
         }, 10000);
      }

      return { on }
   }
   
   try {
      watch('created_after').on(new Date(), issues => Model.insertMany(issues));
      watch('updated_after').on(new Date(), async issues => {
         const updates = issues.map(issue => Model.updateOne({ id: issue.id }, issue));
         await Promise.all(updates);
      })
   } catch(err) {
      console.log('err: ' + err);
   }   
})()