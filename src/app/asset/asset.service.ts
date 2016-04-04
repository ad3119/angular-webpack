import {Http, Response, Headers, JSONP_PROVIDERS, Jsonp} from 'angular2/http';
import {Injectable} from 'angular2/core';
import { BrowserXhr } from 'angular2/src/http/backends/browser_xhr';
/*import {ASSETS} from './mock.asset.tasks';*/
import {Asset} from './asset';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*import {RequestCredentials} from 'angular2/src/http/enums';*/
@Injectable()
export class AssetService {

  constructor(private http: Http) {
    /*let _build = http._backend._browserXHR.build;
      ttp._backend._browserXHR.build = () => {
       let _xhr =  _build();
      _xhr.withCredentials = true;
      return _xhr;
    };*/
  }
  _assetServicesUrl = 'app/asset/people.json';
  result = [];
  //private header: Headers;
  getAssetServices() { //console.log("Yay !!! Some function called me ");
  //return Promise.resolve(ASSETS); console.log("Yay !! I got it done through http");
  var header = new Headers();
  //header.append("TCookie", "JSESSIONID=40101848F3BD9A4D4593962C068ECA72"); 
  header.append('Content-Type', 'application/json');
  return this.http.get(this._assetServicesUrl)
  .map((res: Response) => res.json().items).catch(this.handleError);
 };
 private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
