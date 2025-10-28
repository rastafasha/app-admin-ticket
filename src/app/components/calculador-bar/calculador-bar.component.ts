import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculador-bar',
  templateUrl: './calculador-bar.component.html',
  styleUrls: ['./calculador-bar.component.css']
})
export class CalculadorBarComponent {
  @Input() progress: number = 0;

  ngOnInit
}
