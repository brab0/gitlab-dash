import Request from './request';
import config from "./config";
import { Model } from './odm';
import Database from './database';
import { transform } from './label';

(async () => {
   console.log('running seeds...');

   const database = new Database(config.database);
   const request = new Request(config.gitlab.baseUrl).setToken(config.gitlab.token);

   await database.connect();

   const populate = async (page = 1, count = 0) => {
      const issues = await request.get(`issues?per_page=100&page=${page}`);
       
      count += issues.length;

      if(issues && issues.length > 0) {
         console.log(`${issues.length} issues found at page ${page}`);

         await Model.insertMany(issues.map(issue => Object.assign({}, issue, transform(issue.labels))));

         return populate(++page, count);
      }
      
      return count;
   }

   const total = await populate();

   console.log(`${total} issues inserted.`);
   console.log('Process finished');

   process.exit(0);
})();