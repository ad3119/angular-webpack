import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Log} from  '../../helpers/logging';

@Injectable()
export class Title {
  value = 'Angular 2';
  constructor(public http: Http, private _logger: Log) {

  }

  getData() {
    this._logger.info('Title#getData(): Get Data');
    // return this.http.get('/assets/data.json')
    // .map(res => res.json());
    return {
      value: 'AngularClass'
    };
  }

}
