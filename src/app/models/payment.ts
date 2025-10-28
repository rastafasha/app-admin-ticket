
import { environment } from "src/environments/environment";
import { User } from "./users";

const base_url = environment.url_media;

export class Payment {
   id:number;
   user_id?:User;
   client_id?:number;
   event_id?:number;
   metodo?:string;
   bank_name?:string;
   bank_destino?:string;
   monto:string;
   referencia?:string;
   telefono?:string;
   image?:string;
   avatar?:string;
   deuda?:string;
   monto_pendiente?:string;
   status_deuda?:string;

   fecha?:Date;

   plan_id?:number;
   nombre?:User;
   email?:User;

  //  status?:string;
  //  validacion?:string;
   validacion?:'APPROVED' | 'PENDING' | 'REJECTED';
   status?: 'APPROVED' | 'PENDING' | 'REJECTED';

   updated_at:Date;
   created_at:Date;

   get imagenUrl(){

      if(!this.image){
        return `${base_url}/payments/no-image.jpg`;
      } else if(this.image.includes('https')){
        return this.image;
      } else if(this.image){
        return `${base_url}/payments/${this.image}`;
      }else {
        return `${base_url}/payments/no-image.jpg`;
      }

    }

}

export class StudentWithDebt{
    student_id!:number;
    student_name!: string;
    debt_amount!:number;
    matricula!:number;
    earliest_debt_date!:Date
}
