import { Component, Input } from '@angular/core';
import {  Location } from '@angular/common';
@Component({
    selector: 'app-breadc2',
    standalone:false,
    templateUrl: './breadc2.component.html',
    styleUrls: ['./breadc2.component.css']
})
export class Breadc2Component {
    @Input() title
    @Input() detino
    
    constructor (
        private location: Location,
    ) {}

    goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}