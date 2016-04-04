import {Pipe} from 'angular2/core';
@Pipe({
    name: 'status'
})
export class StatusPipe {
    transform(value) {
        switch (value) {
        	case '0': return 'Failed';
        	case '1': return 'In Progress';
        	case '2': return 'In Progress';
        	case '4': return 'Completed';
        	default: return 'In Progress';
        }
    }
}
