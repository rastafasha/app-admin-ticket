import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { PaServiceCalculatorResponse } from 'src/app/shared/interfaces/pa-service-calculator.interface';

@Injectable({
  providedIn: 'root',
})
export class PaServiceCalculatorService {
  constructor(private http: HttpClient) {}

  calculateUnits(paServiceId: string | number): Observable<PaServiceCalculatorResponse> {
    return this.http.get<PaServiceCalculatorResponse>(
      `${url_servicios}/v2/pa-service-calculator/${paServiceId}`
    );
  }
}
