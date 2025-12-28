import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfiguracionService } from 'src/app/services/configuracion.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit, OnChanges {

  @Input()idconf:number;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  isLoading: boolean = false;
  
   public option_selected: number = 1;
  public solicitud_selected: any = null;

  configForm: UntypedFormGroup;

  public FILE_AVATAR: any;
    public IMAGE_PREVISUALIZA: any = "assets/img/user-06.jpg";
text_validation: any = null;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private configuracionService: ConfiguracionService,
    private location: Location
  ) { }

  ngOnInit() {
    console.log(this.idconf);
  }

  ngOnChanges(): void {

    // Removed form initialization and data loading from here
    this.configForm = this.fb.group({
      id: [''],
      direccion: [''],
      telefono: [''],
      telefonoActivo: [''],
      telPresidencia: [''],
      telPresActivo: [''],
      telSecretaria: [''],
      telSecActivo: [''],
      telTesoreria: [''],
      telTesActivo: [''],
      name: [''],
      image: [''],
    });

    // const id = this.route.snapshot.paramMap.get('1');
    this.configuracionService.getSetting(this.idconf).subscribe(
        (res:any) => {
          this.configForm.patchValue({
            direccion: res.configuracion.direccion,
            telefono: res.configuracion.telefono,
            telefonoActivo: res.configuracion.telefonoActivo,
            telPresidencia: res.configuracion.telPresidencia,
            telPresActivo: res.configuracion.telPresActivo,
            telSecretaria: res.configuracion.telSecretaria,
            telSecActivo: res.configuracion.telSecActivo,
            telTesoreria: res.configuracion.telTesoreria,
            telTesActivo: res.configuracion.telTesActivo,
            name: res.configuracion.name,
            // avatar: res.configuracion.avatar,
            id: res.configuracion.id
          });
          console.log(res);
        }
      );
  }

 
  // get name() { return this.configForm.get('name'); }
  // // get avatar() { return this.configForm.get('avatar'); }
  // get direccion() { return this.configForm.get('direccion'); }
  // get telefono() { return this.configForm.get('telefono'); }
  // get telefonoActivo() { return this.configForm.get('telefonoActivo'); }
  // get telPresidencia() { return this.configForm.get('telPresidencia'); }
  // get telPresActivo() { return this.configForm.get('telPresActivo'); }
  // get telSecretaria() { return this.configForm.get('telSecretaria'); }
  // get telSecActivo() { return this.configForm.get('telSecActivo'); }
    


   loadFile($event: any) {
    if ($event.target.files[0].type.indexOf("image")) {
          this.text_validation = "Solamente pueden ser archivos de tipo imagen";
          return;
        }
        this.text_validation = "";
        this.FILE_AVATAR = $event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.FILE_AVATAR);
        reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
  }

 
  onSubmit () {
    const formData = new FormData();
    formData.append('name', this.configForm.get('name').value);
    formData.append('direccion', this.configForm.get('direccion').value);
    formData.append('telefono', this.configForm.get('telefono').value);
    formData.append('telefonoActivo', this.configForm.get('telefonoActivo').value);
    formData.append('telPresidencia', this.configForm.get('telPresidencia').value);
    formData.append('telPresActivo', this.configForm.get('telPresActivo').value);
    formData.append('telSecretaria', this.configForm.get('telSecretaria').value);
    formData.append('telSecActivo', this.configForm.get('telSecActivo').value);
    
     if (this.FILE_AVATAR) {
      formData.append("imagen", this.FILE_AVATAR);
    }

    const id = this.configForm.get('id').value;

    if (id) {
      this.configuracionService.updateSetting(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/settings']);
          }
        },
        error => this.error = error
      );
    } else {
      this.configuracionService.createSetting(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/settings']);
          }
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

  optionSelected(value: number) {
      this.option_selected = value;
      if (this.option_selected === 1) {
        // this.ngOnInit();
      }
      if (this.option_selected === 2) {
        this.solicitud_selected = null;
      }
      if (this.option_selected === 3) {
        this.solicitud_selected = null;
      }
    }

}
