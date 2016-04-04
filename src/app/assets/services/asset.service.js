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
var mock_assets_1 = require('./mock-assets');
var logging_1 = require('../../helpers/logging');
var AssetService = (function () {
    function AssetService(_logger) {
        this._logger = _logger;
        _logger.info('AssetService constructor');
    }
    AssetService.prototype.getAssets = function () {
        // Use Promise for async behaviour (as REST calling might take long time).
        return Promise.resolve(mock_assets_1.ASSETLIST);
    };
    AssetService.prototype.getAssetsSlowly = function () {
        return new Promise(function (resolve) {
            return setTimeout(function () { return resolve(mock_assets_1.ASSETLIST); }, 2000);
        } // 2 seconds
         // 2 seconds
        );
    };
    AssetService.prototype.getAsset = function (id) {
        return Promise.resolve(mock_assets_1.ASSETLIST).then(function (assets) { return assets.filter(function (asset) { return asset.id === id; })[0]; });
    };
    AssetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [logging_1.Log])
    ], AssetService);
    return AssetService;
}());
exports.AssetService = AssetService;
//# sourceMappingURL=asset.service.js.map