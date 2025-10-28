
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Parent } from '../../models/parents';
import { AuthService } from '../../services/auth.service';
import { PaymentService } from '../../services/payment.service';
import { StudentWithDebt } from '../../models/payment';



@Component({
  selector: 'app-statuspagos',
  standalone:false,
  templateUrl: './statuspagos.component.html',
  styleUrls: ['./statuspagos.component.scss']
})
export class StatuspagosComponent implements OnChanges {
  @Input() userprofile!:  Parent;
  
   isLoading:boolean = false;
    isProfile:boolean = false;
    parent_has_debt:boolean = false;
    student_has_debt:boolean = false;
    public profile: Parent = new Parent();
    parent_debt_amount!:number;
    student_debt_amount!:number;
    precio_fecha!:Date;
    
    student_with_debt: StudentWithDebt[] = [];

    constructor(
      private paymentService: PaymentService,
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
        this.getStatusPadre();
        console.log(this.userprofile);
      }
    }

    getStatusPadre() {
      if (!this.userprofile || !this.userprofile.id) {
        console.warn('userprofile or userprofile.id is undefined, skipping getStatusPadre');
        return;
      }
      this.isLoading = true;
      this.paymentService.getPagosStatusbyUser(this.userprofile.id).subscribe((resp:any)=>{
        this.parent_has_debt = resp.parent_has_debt
        this.parent_debt_amount = resp.parent_debt_amount
        this.student_with_debt = resp.students_with_debt
        this.isLoading = false;

        console.log(this.student_with_debt);
      })
    }
}


