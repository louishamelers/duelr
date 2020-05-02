import {TimeAgoPipe} from 'time-ago-pipe';
import {Pipe} from '@angular/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoExtendsPipe extends TimeAgoPipe {}
