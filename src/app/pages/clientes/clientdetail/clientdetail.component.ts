import { Component, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { Parent } from 'src/app/models/parents';
import Swal from 'sweetalert2';
import { Payment } from 'src/app/models/payment';
import { Evento } from 'src/app/models/evento';
@Component({
  selector: 'app-clientdetail',
  templateUrl: './clientdetail.component.html',
  styleUrls: ['./clientdetail.component.css']
})
export class ClientdetailComponent {
  
    title = "Detalles de la cuenta";
    profileForm: FormGroup;
    imagePath: string;
    error: string;
    uploadError: boolean;
    display = false;
    public option_selected:number = 1;
    public solicitud_selected:any = null;
    isLoading:boolean = false;
    public selectedValue!: string;
  
    identity: any;
  
    user: Parent;
    parent: Parent;
    payments: Payment;
    events: Evento;
    userprofile: Parent;
  
    roles:any;
    profileSeleccionado: Parent;
  
    user_id: any;
    representante_id: any;
    errors:any = null;
  
    constructor(
      private location: Location,
      private clientService: ClientService,
      private activatedRoute: ActivatedRoute,
    ) {
    }
  
    ngOnInit(): void {
      window.scrollTo(0,0);
      this.closeMenu();
      // this.getUser();
      this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));
    }
    closeMenu(){
      var menuLateral = document.getElementsByClassName("sidebar");
        for (var i = 0; i<menuLateral.length; i++) {
           menuLateral[i].classList.remove("active");
  
        }
    }
    goBack() {
      this.location.back(); // <-- go back to previous location on cancel
    }
    
    getUserServer(id:number){
      this.isLoading = true;
      this.clientService.getUserById(+id).subscribe(
        (res:any) =>{
          this.userprofile = res.cliente;
          if(res.representante && res.representante.id){
            this.representante_id = res.representante.id;
          } else {
            this.representante_id = null;
            console.error('User or user.id is undefined in response:', res);
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching user by id:', error);
          this.representante_id = null;
        }
      );
    }
  
   public onReady( editor:any ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }


  optionSelected(value:number){
      this.option_selected = value;
      if(this.option_selected === 1){

        // this.ngOnInit();
        this.solicitud_selected = null;
      }
      if(this.option_selected === 2){
        this.solicitud_selected = null;
      }
      if(this.option_selected === 3){
        this.solicitud_selected = null;
        
      }
    }

    cambiarStatus(userprofile: any) {
        const VALUE = userprofile.status;
        const data = {
          status: VALUE 
        }

        this.clientService.updateStatus(data,userprofile.id ).subscribe((resp) => {
          // console.log(resp);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.ngOnInit();
        });
      }
}
