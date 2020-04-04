import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-playgroup',
  templateUrl: './playgroup.component.html',
  styleUrls: ['./playgroup.component.scss']
})
export class PlaygroupComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('playgroupId'));
  }

}
