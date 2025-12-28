import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  title = "Categorias";


  loading = false;
  usersCount = 0;
  categories: any;
  user: any;
  roles;
  role;
  isLoading: boolean = false;

  p: number = 1;
  id: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query: string = '';

  ServerUrl = environment.url_servicios;
  doctores;
  // role:any;

  constructor(
    private categoryService: CategoryService,
    private http: HttpClient,
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.closeMenu();
    this.getCategories();

  }


  getCategories(): void {
    this.isLoading = true;
    this.categoryService.getAll().subscribe(
      (res: any) => {
        this.categories = res.categories;
        error => this.error = error;
        this.isLoading = false;
        console.log(this.categories);
      }
    );
  }



  search() {
    return this.categoryService.search(this.query).subscribe(
      (res: any) => {
        this.categories = res;
        if (!this.query) {
          this.getCategories();
        }
      });
  }

  public PageSize(): void {
    this.getCategories();
    this.query = '';
  }

  eliminarCat(category:any){
      this.categoryService.delete(category).subscribe(
        (resp:any) =>{
          this.getCategories();
        },
        error=>{
          this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
        }
        );
        this.getCategories();
    }
  
}
