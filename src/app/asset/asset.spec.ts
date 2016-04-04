import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

// Load the implementations that should be tested
import {AssetComponent} from './asset.component';
import {AssetService} from './asset.service';

describe('Assets', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    AssetService,
    AssetComponent
  ]);

  it('should have sorted column ', inject([ AssetComponent ], (asset) => {
    expect(asset.sortedColumn).toEqual('assetId');
  }));
  it('intial sort order shouls be descending ', inject([ AssetComponent ], (asset) => {
    expect(asset.sortAsc).toEqual(false);
  }));

  /*it('should have a title', inject([ Home ], (home) => {
    expect(!!home.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Home ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));
*/
});
