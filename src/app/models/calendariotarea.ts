import { User } from "./users";

export class CalendarioTareas{
    id!:number;
    user_id:number;
    maestro:User;
    student_id:number;
    status:string;
    title:string;
    description:string;
    fecha_entrega:Date;
}