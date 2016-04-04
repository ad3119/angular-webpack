import {Component, OnInit} from 'angular2/core';
import {Workflow} from './workflow';
import {WorkFlowTasksService} from './workflow.service';

@Component({
  selector: 'workflow-service',
  template: require('./../views/workflow.component.html'),
  styles: [require('./../css/panels.css')],
  providers: [WorkFlowTasksService]
})
export class WorkflowComponent {
  public workflowservices: Workflow[];
  public wftasksLength;
  public visible = true;
  public theads = ['Tasks', 'Warning', 'In Progress', 'Falied'];
  constructor(private _workflowService: WorkFlowTasksService ) { };
  getWorkflowTasks() {
   console.log('Inside get workflow');
   this._workflowService.getWorkflowTasks()
	.then(wfservicestasks => {
		this.workflowservices = wfservicestasks;
		this.wftasksLength = wfservicestasks.length;
	});
   /*this._workflowService.getWorkflowTasks()
                     .subscribe(
                       wfservicestasks => this.workflowservices = wfservicestasks,
                       error =>  this.errorMessage = <any>error);*/
  };
  ngOnInit() {
    this.getWorkflowTasks();
  };
  toggle() {
    this.visible = !this.visible;
  };
}
