/**
 * Created by pepijn.bakker on 12-2-2016.
 */
import {Component, ElementRef} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Asset} from './interfaces/asset';
import {AssetDetails} from './assetdetails/assetdetails';
import {AssetService} from './services/asset.service';
import {Log} from '../helpers/logging';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'assets',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ElementRef ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES,
    AssetDetails
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./assets.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./assets.html')
})

export class Assets {
  public assetHeader = 'Assets';

  public selectedAsset: Asset;

    public assetList: Asset[];

  // TypeScript public modifiers
  constructor(private _logger: Log, private _assetService: AssetService ) {
  }

  onSelect(asset: Asset) {
    this.selectedAsset = asset;
  }

  ngOnInit() {
    this._logger.info('hello `Assets` component');
    // getAssetsSlowly: simulate slow connection
    this._assetService.getAssets().then(assets => this.assetList = assets);
  }
}

