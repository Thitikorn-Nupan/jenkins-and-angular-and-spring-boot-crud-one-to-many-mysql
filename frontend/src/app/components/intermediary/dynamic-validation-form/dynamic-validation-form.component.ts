import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {DynamicValidationForm} from "../entities/dynamic-validation-form";

@Component({
  selector: 'dynamic-validation-form',
  templateUrl: './dynamic-validation-form.component.html',
  styleUrl: './dynamic-validation-form.component.css'
})
export class DynamicValidationFormComponent implements OnInit {

  @Input()
  public formTitle! : string;
  @Input()
  public formGroup!: FormGroup;
  @Input()
  public dynamicValidationsForm!: DynamicValidationForm[];
  @Output()
  public submitEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public clearEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public getFormGroup: EventEmitter<FormGroup> = new EventEmitter();

  ngOnInit(): void {
    for (let i = 0; i < this.dynamicValidationsForm.length; i++) {
      this.formGroup.addControl(this.dynamicValidationsForm[i].formControlName!, this.dynamicValidationsForm[i].formControl)
    }
  }

  protected onSubmit(): void {
    this.submitEvent?.emit();
  }

  protected onClear() {
    this.clearEvent?.emit();
  }

}
