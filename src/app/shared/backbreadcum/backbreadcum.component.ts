import { Component, Input } from '@angular/core';
import {  Location } from '@angular/common';
@Component({
    selector: 'app-backbreadcum',
    standalone:false,
    templateUrl: './backbreadcum.component.html',
    styleUrls: ['./backbreadcum.component.css']
})
export class BackbreadcumComponent {
    @Input() title
    
    constructor (
        private location: Location,
    ) {}

    goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}