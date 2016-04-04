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
import {DistributionComponent} from './distribution.component';
import {DistributionService} from './distribution.service';

describe('Distribution', () => {
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
    DistributionService,
    DistributionComponent
  ]);

  it('panel body should be visible', inject([ DistributionComponent ], (distribute) => {
    expect(distribute.visible).toEqual(true);
  }));
  it('check the toggle visible ', inject([ DistributionComponent ], (distribute) => {
	distribute.toggle();
    expect(distribute.visible).toEqual(false);
  }));
});
