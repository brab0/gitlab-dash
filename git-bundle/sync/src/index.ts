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
      var timeout;

      const on = (now, cb) => {
         timeout = setTimeout(async () => {
            const newTimeout = new Date();
            const issues: any = await request.setToken(config.gitlab.token).get(`issues?per_page=20&${param}=${now}`);
            
            if(!issues || issues && issues.length === 0) {
               on(now, cb);
            } else {
               clearTimeout(timeout);
               
               console.log(`Found ${issues.length}: ${param} at ${now}`);
               
               await cb(issues.map(issue => Object.assign({}, issue, transform(issue.labels))));

               on(newTimeout, cb);
            }
         }, 5000);
      }

      return { on }
   }
   
   try {
      watch('created_after').on(new Date(), issues => Model.insertMany(issues));
      watch('updated_after').on(new Date(), async issues => {
         const updates = issues.map(async issue => {
            const dbIssue: any = (await Model.find({ id: issue.id }).sort({ _id:-1 }).limit(1))[0];
            const wasMovedToNewSprint = 
               dbIssue && 
               dbIssue.sprint && 
               issue.sprint && 
               Number(issue.sprint) > Number(dbIssue.sprint);
               
            issue = issue.state == 'closed' ? Object.assign({}, issue, { status: '4 - Done' }) : issue;

            if(!dbIssue || (wasMovedToNewSprint && issue.status !== '4 - Done')) {
               return Model.create(issue)
            } else if(dbIssue) {
               issue = issue.sprint ? issue : Object.assign({}, issue, { sprint: null });
               return Model.updateOne({ _id: dbIssue._id }, issue)
            }            
         });

         await Promise.all(updates);
      })
   } catch(err) {
      console.log('err: ' + err);
   }   
})()