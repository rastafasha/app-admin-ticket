import { Component } from '@angular/core';
import { Materia } from 'src/app/models/materia';
import { AuthService } from 'src/app/services/auth.service';
import { MateriaService } from 'src/app/services/materia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  standalone: false,
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {
public materia: Materia;
public materias: Materia;
  error: string;
  uploadError: string;
  tipoSeleccionado:boolean=false;
  title='Materias';
  isLoading:boolean = false;
  name:string;
description:string;

  constructor(
    private materiaService: MateriaService,
    private accountService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMaterias();
    this.accountService.closeMenu();
  }

  
  getMaterias() {
    this.isLoading = true;
    this.materiaService.getMaterias().subscribe((resp: any) => {
      this.materias= resp;
      this.isLoading = false;
      // console.log(this.tiposdepagos);
    });
  }


  save() {
    const data = {
      name: this.name,
      description: this.description,
    };
    this.materiaService
      .createMateria(data)
      .subscribe((resp: any) => {
        // console.log(resp);
        // this.precio_dia ;
        // this.tipo ='';
        Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Actualizado',
                      showConfirmButton: false,
                      timer: 1500,
                    });
        this.getMaterias();
      });
  }

  deleteTipoPago(tiposdepago: any) {
    this.materiaService
      .deleteMateria(tiposdepago.id)
      .subscribe((resp: any) => {
        this.getMaterias();
      });
  }
}
