import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup} from "@angular/forms";
import {DynamicValidationForm} from "../entities/dynamic-validation-form";

@Component({
  selector: 'dynamic-dialog-form',
  templateUrl: './dynamic-dialog-form.component.html',
  styleUrl: './dynamic-dialog-form.component.css'
})
export class DynamicDialogFormComponent implements OnInit {
  @Input()
  public visible!: boolean ;
  @Input()
  public cancelAble!: boolean ;
  @Input()
  public dialogTitle!: string ;
  @Input()
  public formGroup!: FormGroup;
  @Input()
  public dynamicValidationsForm!: DynamicValidationForm[];

  public isSubmit!: boolean ;

  @Output()
  public submitEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public clearEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public cancelEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public getFormGroup: EventEmitter<FormGroup> = new EventEmitter();

  ngOnInit(): void {
    for (let i = 0; i < this.dynamicValidationsForm.length; i++) {
      this.formGroup.addControl(this.dynamicValidationsForm[i].formControlName!, this.dynamicValidationsForm[i].formControl)
    }
  }


  protected onSubmit(): void {
    this.submitEvent?.emit();
    this.isSubmit = true
  }

  protected onClear() {
    this.clearEvent?.emit();
    this.isSubmit = false
  }

  protected onCancel() {
    this.cancelEvent.emit()
  }

}
