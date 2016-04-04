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
import {Router} from 'angular2/router';
import {Log} from '../helpers/logging';
// Load the implementations that should be tested
import {Home} from './home';
import {Title} from './services/title';
import {AssetService} from '../assets/services/asset.service';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    Log,
    AssetService,
	Router,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    Title,
    Home
  ]);

  it('should have default data', inject([ Home ], (home) => {
    expect(home.data).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Home ], (home) => {
    expect(!!home.title).toEqual(true);
  }));

  it('should info ngOnInit', inject([ Home ], (home) => {
    spyOn(console, 'info');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
