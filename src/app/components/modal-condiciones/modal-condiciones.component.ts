import { Component, OnInit } from '@angular/core';
declare var $:any;  
@Component({
  selector: 'app-modal-condiciones',
  standalone:false,
  templateUrl: './modal-condiciones.component.html',
  styleUrls: ['./modal-condiciones.component.css']
})
export class ModalCondicionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  closeReload(){
    $(".modal-backdrop").remove();
    this.ngOnInit();
  }

}
