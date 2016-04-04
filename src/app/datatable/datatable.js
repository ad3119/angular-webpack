"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_table_1 = require("ng2-table/ng2-table");
var logging_1 = require("../helpers/logging");
var employee_service_1 = require("./services/employee.service");
var DataTable = (function () {
    function DataTable(_logger, _employeeService) {
        this._logger = _logger;
        this._employeeService = _employeeService;
        this.rows = [];
        this.columns = [
            { title: 'Name', name: 'name' },
            { title: 'Position', name: 'position' },
            { title: 'Office', name: 'office' },
            { title: 'Salary', name: 'salary', sort: 'asc' }
        ];
        this.page = 1;
        this.itemsPerPage = 5;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.config = {
            paging: true,
            sorting: { columns: ['salary', 'office'] },
            filteringName: { filterString: '', columnName: 'name' },
            filteringOffice: { filterString: '', columnName: 'office' }
        };
        this.counter = 0;
        this.data = 0;
        this.initialPage = {
            page: 1,
            itemsPerPage: 5
        };
    }
    DataTable.prototype.webSocketConnect = function () {
        var _this = this;
        // Next line is remote websocket echo (not working with push only)
        //this.ws = new WebSocket('ws://echo.websocket.org');
        // Next line is local websocket echo (same as above) and push only
        this.ws = new WebSocket('ws://127.0.0.1:8002/webSocket');
        this.ws.onerror = function (evt) { return _this._logger.error('websocket connection error'); };
        // Comment next line for push only from local websocket
        //this.ws.onmessage = (evt) => this.weSocketMessage(evt.data);
        // Uncomment next line for push only from local websocket
        this.ws.onmessage = function (evt) { return _this.weSocketMessage(evt.data); }; //this.data = evt.data;
        this.ws.onclose = function (evt) { return _this.webSocketClose(); };
        this.ws.onopen = function (evt) { return _this.weSocketMessage(evt.data); };
        this._logger.info('web socket opened');
    };
    DataTable.prototype.webSocketClose = function () {
        this._logger.info('web socket closed');
        setTimeout(function () {
        }, 5000); // 5 seconds timeout
        this.webSocketConnect();
    };
    DataTable.prototype.weSocketMessage = function (data) {
        //    this.data = data;
        this._logger.debug("Received message: " + data);
        if (this.config.filteringName.filterString == '' &&
            this.config.filteringOffice.filterString == '') {
            this.length = this.length + 1;
        }
        //    var that = this;  // Proper context for setTimeout inner function
        //    setTimeout(function() {
        //      that.ws.send(`${ that.counter }`);
        //      that.counter += 1;
        //    }, 2000);  // 2 seconds timeout
    };
    DataTable.prototype.ngOnInit = function () {
        this._logger.info('hello `datatable` component');
        this.onChangeTable(this.config);
        this.webSocketConnect();
    };
    DataTable.prototype.onChangeTable = function (config, page) {
        var _this = this;
        if (page === void 0) { page = this.initialPage; }
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
        this._employeeService.getEmployeesPaged(page.page, this.itemsPerPage, this.columns, this.config.filteringName, this.config.filteringOffice)
            .subscribe(function (data) {
            _this._logger.debug(JSON.stringify(data));
            //noinspection TypeScriptUnresolvedVariable
            _this.rows = data.employees;
            _this.length = data.totalCount;
        }, function (error) { return _this._logger.error('Error occured retrieving employees from server: ' + error); }, function () { return _this._logger.debug('finished retrieving employees from server'); });
    };
    DataTable = __decorate([
        core_1.Component({
            selector: 'datatable',
            // We need to tell Angular's Dependency Injection which providers are in our app.
            providers: [core_1.ElementRef, employee_service_1.EmployeeService],
            // Our list of styles in our component. We may add more to compose many styles together
            styles: [require('./datatable.scss')],
            // Every Angular template is first compiled by the browser before Angular runs it's compiler
            template: require('./datatable.html'),
            directives: [ng2_table_1.NG_TABLE_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [logging_1.Log, employee_service_1.EmployeeService])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=datatable.js.map