/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {Graph} from './graph/graph';
import {Assets} from './assets/assets';
import {AssetComponent} from './asset/asset.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AssetService} from './assets/services/asset.service';
import {AssetDetails} from './assets/assetdetails/assetdetails';
import {Log} from './helpers/logging';
import {LogView} from './logview/logview';
import {DataTable} from './datatable/datatable';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS, ROUTER_PROVIDERS, HTTP_PROVIDERS, JSONP_PROVIDERS,
  Log, AssetService ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  styles: [ require('./app.scss')],
  template: require('./app.html')

})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' },
  { path: '/graph', component: Graph, name: 'Graph' },
  { path: '/assets', component: Assets, name: 'Assets' },
  { path: '/logview', component: LogView, name: 'LogView' },
  { path: '/datatable', component: DataTable, name: 'DataTable' },
  { path: '/asset2', component: AssetComponent, name: 'AssetComponent' },
  { path: '/assetdetails/:id', component: AssetDetails, name: 'AssetDetails' },
  { path: '/dashboard', component: DashboardComponent, name: 'DashboardComponent' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  angularclassLogo = 'assets/img/angular-logo.png';
  seachangeLogo = 'assets/img/logo-seachange.png';
  menuToggler = 'assets/img/menu-toggler.png';
  avatar = 'assets/img/avatar-jperry.jpg';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  constructor(private _logger: Log) {
    _logger.info('App entry point');
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
