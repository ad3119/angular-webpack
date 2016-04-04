import {Component, OnInit, ElementRef} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from 'angular2/common';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import {Log} from '../helpers/logging';
import {EmployeeService} from './services/employee.service';

@Component({
  selector: 'datatable',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ElementRef, EmployeeService ],

  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./datatable.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./datatable.html'),

  directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES,
    NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class DataTable implements OnInit {
  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Position', name: 'position'},
    {title: 'Office', name: 'office'},
    {title: 'Salary', name: 'salary', sort: 'asc'}
  ];
  public page: number = 1;
  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: {columns: ['salary', 'office']},
    filteringName: {filterString: '', columnName: 'name'},
    filteringOffice: {filterString: '', columnName: 'office'}
  };

  private counter = 0;
  private ws;
  private data = 0;

  private initialPage: any = {
    page: 1,
    itemsPerPage: 5
  };

  constructor(private _logger: Log,
              private _employeeService: EmployeeService) {
  }

  webSocketConnect() {
    // Next line is remote websocket echo (not working with push only)
    //this.ws = new WebSocket('ws://echo.websocket.org');
    // Next line is local websocket echo (same as above) and push only
    this.ws = new WebSocket('ws://127.0.0.1:8002/webSocket');
    this.ws.onerror = (evt) => this._logger.error('websocket connection error');
    // Comment next line for push only from local websocket
    //this.ws.onmessage = (evt) => this.weSocketMessage(evt.data);
    // Uncomment next line for push only from local websocket
    this.ws.onmessage = (evt) => this.weSocketMessage(evt.data); //this.data = evt.data;
    this.ws.onclose = (evt) => this.webSocketClose();
    this.ws.onopen = (evt) => this.weSocketMessage(evt.data);

    this._logger.info('web socket opened');
  }

  webSocketClose() {
    this._logger.info('web socket closed');
    setTimeout(function() {
    }, 5000);  // 5 seconds timeout
    this.webSocketConnect();
  }

  weSocketMessage(data) {
//    this.data = data;
    this._logger.debug('Received message: ' + data);
    if (this.config.filteringName.filterString === '' &&
      this.config.filteringOffice.filterString === '') {
      this.length = this.length + 1;
    }
//    var that = this;  // Proper context for setTimeout inner function
//    setTimeout(function() {
//      that.ws.send(`${ that.counter }`);
//      that.counter += 1;
//    }, 2000);  // 2 seconds timeout
  }

  ngOnInit() {
    this._logger.info('hello `datatable` component');
    this.onChangeTable(this.config);
    this.webSocketConnect();
  }

  onChangeTable(config: any, page: any = this.initialPage) {
    if (config.filteringName) {
      Object.assign(this.config.filteringName, config.filteringName);
    }
    if (config.filteringOffice) {
      Object.assign(this.config.filteringOffice, config.filteringOffice);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    this._logger.debug('onChangeTable');

    this._employeeService.getEmployeesPaged(page.page, this.itemsPerPage,
      this.columns, this.config.filteringName, this.config.filteringOffice)
      .subscribe(
        data => {
          this._logger.debug(JSON.stringify(data));

          //noinspection TypeScriptUnresolvedVariable
          this.rows = data.employees;
          this.length = data.totalCount;
        },
        error => this._logger.error('Error occured retrieving employees from server: ' + error),
        () => this._logger.debug('finished retrieving employees from server')
      );
    }
}
