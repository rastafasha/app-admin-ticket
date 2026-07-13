import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Evento } from 'src/app/models/evento';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { EventoService } from 'src/app/services/evento.service';
declare var bootstrap: any;
@Component({
  selector: 'app-list',
  templateUrl: './Companylist.component.html',
  styleUrls: ['./Companylist.component.css']
})
export class CompanyListComponent {
  @ViewChild('viewCompany', { static: false }) offcanvasElement!: ElementRef;

  public companies: Company[] = [];
  isLoading: boolean = false;
  title = "Lista de Empresas";
  p: number = 1;
  id: number = 1;
  count: number = 8;
  query: string = '';
  companySeleccionado: Company;
  eventoSeleccionado: Evento;
  eventSeleccionado: Evento;
  evento:any;
  constructor(
    private companyService: CompanyService,
    public authService: AuthService,
    public eventoService: EventoService,
  ) {

  }

  ngOnInit(): void {
    this.authService.closeMenu();
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.isLoading = true;
    this.companyService.getAll().subscribe(
      (data: any) => {
        this.companies = data.companies.data;
        this.isLoading = false;

      },
      (error) => {
        console.error('Error fetching companies', error);
      }
    );
  }

  eliminarCompany(id: number): void {
    this.companyService.delete(id).subscribe(
      (response) => {
        console.log('Company deleted successfully', response);
        this.loadCompanies();
      },
      (error) => {
        console.error('Error deleting company', error);
      }
    );
  }

  search() {
    return this.companyService.search(this.query).subscribe(
      (res: any) => {
        this.companies = res
        if (!this.query) {
          this.loadCompanies();
        }
      });
  }

  public PageSize(): void {
    this.loadCompanies();
    this.query = '';
  }

   onEditProject(company: Company) {
    this.companySeleccionado = company;
  }

  openEditModal(): void {
    this.companySeleccionado = null;
  }

  openViewDetail(company: Company) {
    this.companySeleccionado = company;
    
  }
  

  onCloseModal(): void {
    this.companySeleccionado = null;
  }

  onClose() {
    this.ngOnInit();
  }

  manejarCambioModal(eventoId: number) {
    // 1. Instanciamos y cerramos el modal de la empresa de forma limpia
    const modalEmpresaEl = document.getElementById('viewCompany');
    const modalEmpresa = bootstrap.Modal.getInstance(modalEmpresaEl);
    modalEmpresa?.hide();

    // 2. Esperamos 350ms a que termine de ocultarse (evita congelar la pantalla o el fondo gris)
    setTimeout(() => {
  this.cargarDatosDelEvento(eventoId);

  const modalEventoEl = document.getElementById('viewEvento');
  
  // Validación de seguridad para evitar el error de 'classList'
  if (!modalEventoEl) {
    console.error("ERROR: No se encontró ningún elemento en el DOM con el id 'viewEvento'. Verifica tu HTML.");
    return; // Detiene la ejecución antes de que rompa la aplicación
  }

  // Si existe, lo inicializa y lo muestra con seguridad
  const modalEvento = new bootstrap.Modal(modalEventoEl);
  modalEvento.show();
}, 350);
  }

  cargarDatosDelEvento(id: number) {
    this.eventoService.getById(id).subscribe(resp => {
      this.eventoSeleccionado = resp.event;
    });
  }


  // Variable para saber qué evento se va a editar (opcional)


abrirEditarDesdeVer(eventoObjeto: any) {
  if (!eventoObjeto) return;

  // 1. Guardamos el objeto completo recibido del hijo
  this.eventSeleccionado = eventoObjeto;
  
  // O si usas un formulario reactivo en el padre, puedes rellenarlo directamente aquí:
  // this.editarForm.patchValue(eventoObjeto);

  // 2. Buscamos y cerramos el modal de visualización
  const modalVerEl = document.getElementById('viewEvento');
  const modalVer = bootstrap.Modal.getInstance(modalVerEl);
  modalVer?.hide();

  // 3. Esperamos la animación de cierre (350ms)
  setTimeout(() => {
    const modalEditarEl = document.getElementById('editEvento');
    
    if (!modalEditarEl) {
      console.error("No se encontró el elemento HTML con id 'editEvento'");
      return;
    }

    // 4. Abrimos el modal de edición de forma segura
    const modalEditar = new bootstrap.Modal(modalEditarEl);
    modalEditar.show();
  }, 350);
}



}
