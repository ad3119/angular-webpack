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
import {DropboxComponent} from './dropbox.component';
import {DropboxService} from './dropbox.service';

describe('Dropbox', () => {
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
    DropboxService,
    DropboxComponent
  ]);

  it('panel body should be visible', inject([ DropboxComponent ], (dropbox) => {
    expect(dropbox.visible).toEqual(true);
  }));
  it('check the toggle visible ', inject([ DropboxComponent ], (dropbox) => {
	dropbox.toggle();
    expect(dropbox.visible).toEqual(false);
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
