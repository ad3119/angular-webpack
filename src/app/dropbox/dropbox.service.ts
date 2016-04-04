import {Http, Response} from 'angular2/http';
import {DROPBOXES} from './mock.dropbox';
import {Injectable} from 'angular2/core';

@Injectable()
export class DropboxService {
  getdropboxServices() {
   return Promise.resolve(DROPBOXES);
  };
}
