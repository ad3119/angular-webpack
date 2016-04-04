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
/**
 * Created by pepijn.bakker on 12-2-2016.
 */
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var asset_service_1 = require('../services/asset.service');
var router_1 = require('angular2/router');
var logging_1 = require('../../helpers/logging');
var AssetDetails = (function () {
    // TypeScript public modifiers
    function AssetDetails(_assetService, _routeParams, _logger) {
        this._assetService = _assetService;
        this._routeParams = _routeParams;
        this._logger = _logger;
    }
    AssetDetails.prototype.goBack = function () {
        window.history.back();
    };
    AssetDetails.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug('hello `AssetDetails` component');
        var id = +this._routeParams.get('id');
        this._assetService.getAsset(id)
            .then(function (asset) { return _this.asset = asset; });
    };
    AssetDetails = __decorate([
        core_1.Component({
            // The selector is what angular internally uses
            // for `document.querySelectorAll(selector)` in our index.html
            // where, in this case, selector is the string 'app'
            selector: 'assetdetails',
            // We need to tell Angular's Dependency Injection which providers are in our app.
            providers: [core_1.ElementRef],
            // We need to tell Angular's compiler which directives are in our template.
            // Doing so will allow Angular to attach our behavior to an element
            directives: common_1.FORM_DIRECTIVES.slice(),
            inputs: ['asset'],
            // We need to tell Angular's compiler which custom pipes are in our template.
            pipes: [],
            // Our list of styles in our component. We may add more to compose many styles together
            styles: [require('./assetdetails.scss')],
            // Every Angular template is first compiled by the browser before Angular runs it's compiler
            template: require('./assetdetails.html')
        }), 
        __metadata('design:paramtypes', [asset_service_1.AssetService, router_1.RouteParams, logging_1.Log])
    ], AssetDetails);
    return AssetDetails;
}());
exports.AssetDetails = AssetDetails;
//# sourceMappingURL=assetdetails.js.map