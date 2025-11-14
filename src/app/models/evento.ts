import { environment } from "src/environments/environment";
const base_url = environment.url_media;

export class Evento {

    id: number;
    user_id: number;
    client_id: number;
    name: string = "";
    description: string = "";
    company: string = "";
    fecha_inicio: Date;
    fecha_fin: Date;
    precio_general: number = 0;
    precio_estudiantes: number = 0;
    precio_especialistas: number = 0;
    is_featured: boolean = false;
    created_at: string = "";
    image: string = "";
    avatar: string = "";
    status?: 'ACTIVE' | 'INACTIVE' | 'FINISHED' | 'RETIRED';
    ticketcount?: number;
    



    // public get isActive():boolean{
    //     return (this.is_active === 1 ? true: false);
    // }


    get imagenUrl(){

      if(!this.image){
        return `${base_url}public/no-image.png`;
      } else if(this.image.includes('https')){
        return this.image;
      } else if(this.image){
        return `${base_url}events/${this.image}`;
      }else {
        return `${base_url}/no-image.jpg`;
        // return `./assets/img/no-image.jpg`;
      }

    }

}
