
import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, JSONP_PROVIDERS}    from 'angular2/http';
import {Asset} from './asset';
import {AssetService} from './asset.service';
import {PercentagePipe} from './../pipes/percentage.pipe';
import {StatusPipe} from './../pipes/status';
import {SearchPipe} from './../pipes/search.pipe';
//import {MyBaseRequestOptions} from './../browser-request/customXhr'
import {Sorter} from './../pipes/Sorter';

@Component({
  selector: 'asset-service',
  //templateUrl: 'app/views/asset.component.html',
  template: require('./../views/asset.component.html'),
  styles: [require('./../css/panels.css')],
  pipes: [PercentagePipe, StatusPipe, SearchPipe],
  //styleUrls:['app/css/panels.css'],
  providers: [AssetService, HTTP_PROVIDERS, JSONP_PROVIDERS]
})
export class AssetComponent {
  public search_text = '';
  public assetServices: Asset[];
  public assetServiceLength = 0;
  public sortedColumn: string = 'assetId';
  errorMessage: string;
  sorter: Sorter;
  sortAsc = false;
  public visible = true;

  constructor(private _assetServices: AssetService) {
    this.sorter = new Sorter();
  };

  sort(key) {
    this.sorter.sort(key, this.assetServices);
    this.sortedColumn = key;
    if (key === this.sortedColumn) {
      this.sortAsc = !this.sortAsc;
    } else {
     this.sortAsc = true;
    }
  }
  /*sortIcon(key) {
    console.log(key);
    if (this.sortedColumn == key) return true;
    return false;
  }*/
  toggle() {
    this.visible = !this.visible;
  }
  getAssetService() {
   /*this._assetServices.getAssetServices().
   then(tasks => this.assetServices = tasks)*/
   this._assetServices.getAssetServices()
   .subscribe(tasks => this.assetServices = tasks, error => this.errorMessage = <any>error);
  };
  ngOnInit() {
    this.getAssetService();
  }
}
