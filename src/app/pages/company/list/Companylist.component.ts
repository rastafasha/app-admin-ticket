import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/models/company';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';

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
  constructor(
    private companyService: CompanyService,
    public authService: AuthService,
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

}
