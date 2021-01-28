import { connect, set } from 'mongoose';

export default class Database {
   private config;

   constructor(config){
      set('useCreateIndex', true)
      set('useNewUrlParser', true);
      set('useFindAndModify', false);
      set('useCreateIndex', true);
      set('useUnifiedTopology', true);

      this.config = config;
   }

   connect() {
      return connect(this.config.uri, this.config.options);
   }
}