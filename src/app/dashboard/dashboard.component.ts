import {Component} from 'angular2/core';
import {WorkflowComponent} from './../workflow/workflow.component';
import {DistributionComponent} from './../distribution/distribution.component';
import {AssetComponent} from './../asset/asset.component';
import {DropboxComponent} from './../dropbox/dropbox.component';
import {TTVQueueComponent} from './../ttvqueue/ttvqueue.component';
import {ContentProcessingJobComponent} from
'./../content-processing/contentprocessingjob.component';

@Component({
  selector: 'dashboard',
  template: require('./../views/dashboard.component.html'),
  directives: [WorkflowComponent, DistributionComponent, AssetComponent, DropboxComponent,
  TTVQueueComponent, ContentProcessingJobComponent]
})

export class DashboardComponent {
  public name = 'Arjun!!';
}
