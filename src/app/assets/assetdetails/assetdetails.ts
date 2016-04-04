/**
 * Created by pepijn.bakker on 12-2-2016.
 */
import {Component, ElementRef, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Asset} from '../interfaces/asset';
import {AssetService} from '../services/asset.service';
import {RouteParams} from 'angular2/router';
import {Log} from '../../helpers/logging';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'assetdetails',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ElementRef ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES
  ],
  inputs: ['asset'],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./assetdetails.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./assetdetails.html')
})

export class AssetDetails {
  public asset: Asset;

  // TypeScript public modifiers
  constructor(
              private _assetService: AssetService,
              private _routeParams: RouteParams,
              private _logger: Log) {

  }



  goBack() {
    window.history.back();
  }

  ngOnInit() {
    this._logger.debug('hello `AssetDetails` component');
    let id = +this._routeParams.get('id');
    this._assetService.getAsset(id)
      .then(asset => this.asset = asset);
  }
}

