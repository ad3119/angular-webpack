import {Http, Response} from 'angular2/http';
import {Workflow} from './workflow';
import {WORKFLOWS} from './mock-workflow.tasks';
import {Injectable} from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
@Injectable()
export class WorkFlowTasksService {
  private _workflowServicesUrl = 'app/scripts/workflow/mock-workflow.tasks';
  constructor (private http: Http) {}
  getWorkflowTasks() {
   // console.log("Yay !!! Some function called me :) " , Promise.resolve(WORKFLOWS));
    return Promise.resolve(WORKFLOWS);
    /*console.log("Yay !! I got it done through http")
    return this.http.get(this._workflowServicesUrl)
                    .map(res => <Workflow[]> res.json().data)
                    .catch(this.handleError);*/
  };
  // See the "Take it slow" appendix
  getWorkflowTasksSlowly() {
    return new Promise<Workflow[]>(resolve =>
      setTimeout(() => resolve(WORKFLOWS), 2000) // 2 seconds
    );
  }
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
