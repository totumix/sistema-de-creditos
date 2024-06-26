import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Credit } from 'src/app/core/models/Credit.model';

@Injectable({
  providedIn: 'root'
})
export class BaseFormCreditRequestService {
  public baseForm: UntypedFormGroup;
  public creditValue = new BehaviorSubject<any>(0);
  public value = this.creditValue.asObservable();

  public changeMonto(monto): void {
    this.creditValue.next(monto);
  }

  constructor(private fb: UntypedFormBuilder) {
    this.baseForm = this.fb.group({
      id: [Math.random()],
      nombre: [null, Validators.required],
      monto: [null, [Validators.min(10000), Validators.max(100000), Validators.required]],
      aprobado: [null],
      fecha: [null],
    });
  }

  public pathFormData(user): void {
    this.baseForm.patchValue({
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      cedula: user.cedula
    });
  }

  resetForm(credit?) {
    this.baseForm.reset(new Credit);
  }
}
