import {Component, AfterViewInit, ElementRef, AfterContentInit, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import * as d3 from 'd3';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import {Log} from '../helpers/logging';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'graph',  // <graph></graph>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ElementRef ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./graph.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./graph.html')
})

export class Graph implements OnInit {

  elementRef: ElementRef;
  // TypeScript public modifiers
  constructor(elementRef : ElementRef,
              private _logger: Log) {
    this.elementRef = elementRef;
  }

  ngOnInit() {
    this._logger.info('hello `graph` component');

    d3.select(DOM.getElementsByClassName(this.elementRef.nativeElement, 'graph')[0]).
      selectAll('div').
      data([10, 20, 30, 40, 60]).enter().append('div')
        .transition().ease('elastic')
        .style('width', d => d + '%')
        .text(d => d + '%');

    return undefined;
  }
}
