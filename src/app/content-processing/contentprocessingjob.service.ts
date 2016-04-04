import {Http, Response} from 'angular2/http';
import {JOBS} from './mock.contentprocessingjob.tasks';
import {Injectable} from 'angular2/core';

@Injectable()
export class ContentProcessingJobService {
  getContentProcessingJobs() {
    return Promise.resolve(JOBS);
  };
}
