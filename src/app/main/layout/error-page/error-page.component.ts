import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  public errorStatusCode: any;

  constructor(private router: Router,
              private actRoute: ActivatedRoute,
              private location: Location) {
    // this.errorStatusCode = this.actRoute.snapshot.params.errorStatusCode;
  }

  ngOnInit(): void {
  }
  reload(): void{
    this.location.back();
  }
}
