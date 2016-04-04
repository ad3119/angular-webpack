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
import {WorkflowComponent} from './workflow.component';
import {WorkFlowTasksService} from './workflow.service';

describe('Workflows', () => {
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
    WorkFlowTasksService,
    WorkflowComponent
  ]);

  it('panel body should be visible', inject([ WorkflowComponent ], (workflow) => {
    expect(workflow.visible).toEqual(true);
  }));
  it('check the toggle visible ', inject([ WorkflowComponent ], (workflow) => {
	workflow.toggle();
    expect(workflow.visible).toEqual(false);
  }));
  it('fetch the workflows from mock', inject([ WorkflowComponent ], (workflow) => {
	workflow.getWorkflowTasks();
    expect(workflow.wftasksLength).toEqual(9);
  }));
});
