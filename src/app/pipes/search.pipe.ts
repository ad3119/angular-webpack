import {Pipe} from 'angular2/core';

@Pipe({
    name: 'search'
})
export class SearchPipe {
    transform(value,  args) {
    if (!args[0]) {
 		return value;
    }  else if (value) {
      return value.filter(item => {
        for (var key in item) {
          if ((typeof item[key] === 'string' || item[key] instanceof String) &&
              (item[key].indexOf(args[0]) !== -1)) {
		       return true;
          }
        }
      });
    }
  }
}
