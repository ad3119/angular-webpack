import {Pipe} from 'angular2/core';
@Pipe({
    name: 'percentage'
})
export class PercentagePipe {
    transform(value) {
        return value + '%';
		}
}
