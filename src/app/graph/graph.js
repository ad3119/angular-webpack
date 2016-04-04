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
var d3 = require('d3');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var logging_1 = require('../helpers/logging');
var Graph = (function () {
    // TypeScript public modifiers
    function Graph(elementRef, _logger) {
        this._logger = _logger;
        this.elementRef = elementRef;
    }
    Graph.prototype.ngOnInit = function () {
        this._logger.info('hello `graph` component');
        d3.select(dom_adapter_1.DOM.getElementsByClassName(this.elementRef.nativeElement, 'graph')[0]).
            selectAll('div').
            data([10, 20, 30, 40, 60]).enter().append('div')
            .transition().ease('elastic')
            .style('width', function (d) { return d + '%'; })
            .text(function (d) { return d + '%'; });
        return undefined;
    };
    Graph = __decorate([
        core_1.Component({
            // The selector is what angular internally uses
            // for `document.querySelectorAll(selector)` in our index.html
            // where, in this case, selector is the string 'app'
            selector: 'graph',
            // We need to tell Angular's Dependency Injection which providers are in our app.
            providers: [core_1.ElementRef],
            // We need to tell Angular's compiler which directives are in our template.
            // Doing so will allow Angular to attach our behavior to an element
            directives: common_1.FORM_DIRECTIVES.slice(),
            // We need to tell Angular's compiler which custom pipes are in our template.
            pipes: [],
            // Our list of styles in our component. We may add more to compose many styles together
            styles: [require('./graph.scss')],
            // Every Angular template is first compiled by the browser before Angular runs it's compiler
            template: require('./graph.html')
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, logging_1.Log])
    ], Graph);
    return Graph;
}());
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map