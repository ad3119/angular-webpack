/**
 * Created by pepijn.bakker on 16-2-2016.
 */
import {Component, AfterViewInit, ElementRef, AfterContentInit, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import {Log} from '../helpers/logging';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'logview',  // <graph></graph>
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
  styles: [ require('./logview.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./logview.html')
})

export class LogView implements OnInit {

  // TypeScript public modifiers
  constructor(private _elementRef : ElementRef,
              private _logger: Log) {
    //this._logger.showInPageLogging(
    // DOM.getElementsByClassName(this.elementRef.nativeElement, 'inpagelogging')[0]);
  }

  toggleLoggingWindow() {
    this._logger.toggleLoggingPopup();
  }

  toggleLoggingConsole() {
    this._logger.toggleInPageLogging(
      DOM.getElementsByClassName(
        this._elementRef.nativeElement, 'inpagelogging')[0]);
  }


  ngOnInit() {
    this._logger.info('hello `LogView` component');

  }
}
