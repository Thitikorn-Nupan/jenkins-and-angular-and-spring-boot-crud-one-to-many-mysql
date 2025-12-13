import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HeaderColumn} from "../entities/header-column";


@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-tree-table.component.html',
  styleUrl: './dynamic-tree-table.component.css'
})
export class DynamicTreeTableComponent implements OnInit {

  @Input()
  public tableTitle! : string
  @Input()
  public data! : any[]
  @Input()
  public dataId! : { field:string,value?:any }
  @Input()
  public subData! : any[]
  @Input()
  public enableNestedTable!: boolean;
  @Input()
  public headerColumns! : HeaderColumn[]
  @Input()
  public subHeaderColumns! : HeaderColumn[]

  @Input()
  public disableEditButton : boolean = false
  @Input()
  public disableRemoveButton : boolean = false
  @Input()
  public disableTreeButton : boolean = false

  @Output()
  public editEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public removeEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public treeTableEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public closeTreeTableEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  public getData: EventEmitter<any[]> = new EventEmitter();


  ngOnInit(): void {
    this.getData.emit(this.data)
  }

  protected onTreeTable(row:any) {
    this.treeTableEvent.emit(row)
  }

  protected onEdit(row:any) {
    this.editEvent.emit(row)
  }

  protected onRemove(row:any) {
    this.removeEvent.emit(row)
  }

  protected onCloseTreeTable() {
    this.closeTreeTableEvent.emit()
  }

}
