import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicDialogConfirm} from "../entities/dynamic-dialog-confirm";

@Component({
  selector: 'dynamic-dialog-confirm',
  templateUrl: './dynamic-dialog-confirm.component.html',
  styleUrl: './dynamic-dialog-confirm.component.css'
})
export class DynamicDialogConfirmComponent  {

  @Input()
  public visible!: boolean ;
  @Input()
  public cancelAble!: boolean ;
  @Input()
  public dynamicDialogConfirm! :DynamicDialogConfirm
  @Output()
  public okEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public closeEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public cancelEvent: EventEmitter<any> = new EventEmitter();


  protected onOk() {
    this.okEvent.emit()
  }

  protected onClose() {
    this.closeEvent.emit()
  }

  protected onCancel() {
    this.cancelEvent.emit()
  }
}
