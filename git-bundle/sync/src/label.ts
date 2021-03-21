import { Properties } from './odm';

export const transform = (labels: any) => {
   if(!labels || labels && labels.length === 0) return {};

   return labels.reduce((prev, label) => {
      const key: any = Object.keys(Properties).find((key: any) => label.indexOf(Properties[key].text_pattern) > -1);

      if(!key) return prev;

      const getValue = val => {
         const property = Properties[key];
         const value = val.replace(property.text_pattern, '');
         
         switch(property.type) {
            case String:
               return !property.enum ? value : value === '' ? property.enum[0] : property.enum[1]
            case Number:
               return Number(value)
            case Boolean:
               return value === ''
            case Array:
               return prev[key] ? prev[key].concat(value) : [value]
            case Object:
               return prev[key] ? Object.assign({}, prev[key], { [value] : true }) : { [value] : true }
         }         
      }

      return Object.assign({}, prev, { [key]: getValue(label) });
   }, {});
}