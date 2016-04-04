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
import {TTVQueueComponent} from './ttvqueue.component';


describe('TTV Queues', () => {
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
    TTVQueueComponent
  ]);

  it('panel body should be visible', inject([ TTVQueueComponent ], (ttvqueue) => {
    expect(ttvqueue.visible).toEqual(true);
  }));
  it('check the toggle visible ', inject([ TTVQueueComponent ], (ttvqueue) => {
	ttvqueue.toggle();
    expect(ttvqueue.visible).toEqual(false);
  }));
});
