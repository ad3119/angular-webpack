/**
 * Created by pepijn.bakker on 12-2-2016.
 */
import {Injectable, Inject} from 'angular2/core';
import {EMPLOYEELIST} from './mock-employee';
import {Employee} from '../interfaces/employee';
import {Log} from '../../helpers/logging';
import {Filter} from '../interfaces/filter';
import {SortSettings} from '../interfaces/sortsettings';
import {Http, Response, Jsonp, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  private _ecmServerUrl = 'http://127.0.0.1:8000/DEMOService/Employees';

  constructor(private _logger: Log, public _http: Jsonp) {
    _logger.info('EmployeeService constructor');
  }

    getEmployees() {
    // Use Promise for async behaviour (as REST calling might take long time).
    return Promise.resolve(EMPLOYEELIST);
  }

  getEmployeesSlowly() {
    return new Promise<Employee[]>(resolve =>
      setTimeout(() => resolve(EMPLOYEELIST), 2000) // 2 seconds
    );
  }

  getEmployee(id: number) {
    return Promise.resolve(EMPLOYEELIST).then(
      employees => employees.filter(e => e.id === id)[0]
    );
  }

  getEmployeesPaged(page: number, pageSize: number, columns: Array<SortSettings>,
                    filterName: Filter, filterOffice: Filter) {
    this._logger.debug('getEmployeesPaged: ' + page + ' filter on name: '
      + filterName.filterString + ' filter on office: ' +
      filterOffice.filterString);

    var sort: string;
    for (let i = 0; i < columns.length; i++) {
      // this._logger.debug('getEmployeesPaged: column: ' +
      // columns[i].name + ' sort: ' + columns[i].sort);

    if (sort) {
      sort += '|';
    } else {
      sort = '';
    }

    sort += columns[i].name + ':' + columns[i].sort;
    }

    var params = new URLSearchParams();
    params.set('page', String(page));
    params.set('pageSize', String(pageSize));
    params.set('filter', filterName.columnName + ':' + filterName.filterString + '|' +
      filterOffice.columnName + ':' + filterOffice.filterString);
    params.set('sort', sort);
    //params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    //return Promise.resolve(EMPLOYEELIST);
    return this._http.get(this._ecmServerUrl, { search: params })
      .map(res => res.json().data)
      .do(data => console.log(data)) // eyeball results in the console
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
