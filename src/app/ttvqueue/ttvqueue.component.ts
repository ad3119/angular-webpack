import {Component} from 'angular2/core';
@Component({
  selector: 'ttvqueue',
  //templateUrl: 'app/views/ttvqueue.component.html',
  template: require('./../views/ttvqueue.component.html'),
  styles: [require('./../css/panels.css')],
})
export class TTVQueueComponent {
  public visible = true;
  toggle() {
    this.visible = !this.visible;
  }
}
