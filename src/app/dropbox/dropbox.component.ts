import {Component, OnInit} from 'angular2/core';
import {Dropbox} from './dropbox';
import {DropboxService} from './dropbox.service';
import {PercentagePipe} from './../pipes/percentage.pipe';

@Component({
  selector: 'dropbox',
  styles: [require('./../css/panels.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./../views/dropbox.component.html'),
  pipes: [PercentagePipe],
  //styleUrls:[require('./panels.css')],
  providers: [DropboxService]
})
export class DropboxComponent {
  public Dropboxes: Dropbox[];
  constructor(private _dropboxService: DropboxService ) { };
  public visible = true;
  toggle() {
    this.visible = !this.visible;
  }
  getDropboxService() {
   this._dropboxService.getdropboxServices().then(tasks => this.Dropboxes = tasks);
  };
   /*this._workflowService.getWorkflowTasks()
                     .subscribe(
                       wfservicestasks => this.workflowservices = wfservicestasks,
                       error =>  this.errorMessage = <any>error);*/
  ngOnInit() {
    this.getDropboxService();
  }
}
