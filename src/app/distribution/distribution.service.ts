import {Http, Response} from 'angular2/http';
import {Distribution} from './distribution';
import {TASKS} from './mock.distribution.tasks';
import {Injectable} from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
@Injectable()
export class DistributionService {
  private _distributionServicesUrl = 'app/scripts/workflow/mock.distribution.tasks';
  constructor (private http: Http) {}
  getDistributionTasks() {
   console.log('Yay !!! Some function called me :) ' , Promise.resolve(TASKS));
    return Promise.resolve(TASKS);
    /*console.log("Yay !! I got it done through http")
    return this.http.get(this._workflowServicesUrl)
                    .map(res => <Workflow[]> res.json().data)
                    .catch(this.handleError);*/
  };
  // See the "Take it slow" appendix
  getWorkflowTasksSlowly() {
	// 2 seconds
    return new Promise<Distribution[]>(resolve => setTimeout(() => resolve(TASKS), 2000));
  }
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
