import {Workflow} from './workflow';
export var WORKFLOWS: Workflow[] = [
   {'task': 'Initiate', 'failed': '1', 'inprogress': '0', 'warning': '3'},
   {'task': 'Filter', 'failed': '3', 'inprogress': '0', 'warning': '3'},
   {'task': 'Validate', 'failed': '0', 'inprogress': '0', 'warning': '3'},
   {'task': 'Normalize', 'failed': '0', 'inprogress': '0', 'warning': '3'},
   {'task': 'Localize', 'failed': '0', 'inprogress': '2', 'warning': '3'},
   {'task': 'Distribute', 'failed': '0', 'inprogress': '0', 'warning': '3'},
   {'task': 'Delete Asset', 'failed': '6', 'inprogress': '0', 'warning': '3'},
   {'task': 'Delete Asset On Site', 'failed': '0', 'inprogress': '0', 'warning': '3'},
   {'task': 'Ingest Contest', 'failed': '0', 'inprogress': '0', 'warning': '3'}
];
