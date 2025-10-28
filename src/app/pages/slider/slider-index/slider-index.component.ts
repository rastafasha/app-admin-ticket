import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {Slider} from '../../../models/slider';
import { SliderService } from '../../../services/slider.service';


@Component({
  selector: 'app-slider-index',
  templateUrl: './slider-index.component.html',
})
export class SliderIndexComponent implements OnInit {



  titlepage = 'Slider';
  sliders: Slider;
  slider: Slider;
  error: string;

  ServerUrl = environment.url_servicios;
  imageUrl = environment.url_media;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 8;

  constructor(
    public sliderService: SliderService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.getArtPrensas();
    window.scrollTo(0, 0);

  }

  getArtPrensas(){
    this.sliderService.getSliders().subscribe((resp:any)=>{
      this.sliders = resp.sliders.data;
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.sliderService.deleteSlider(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
