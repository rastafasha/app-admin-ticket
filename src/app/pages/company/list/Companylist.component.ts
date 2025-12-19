import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-list',
  templateUrl: './Companylist.component.html',
  styleUrls: ['./Companylist.component.css']
})
export class CompanyListComponent  {

  public companies: Company[] = [];
  isLoading:boolean=false;
  title = "Lista de Empresas";
  p: number = 1;
      id: number = 1;
      count: number = 8;

  constructor(
    private companyService: CompanyService
  ) {
    
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.isLoading = true;
    this.companyService.getAll().subscribe(
      (data: any) => {
        this.companies = data.companies;
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

}
