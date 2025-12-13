import {Component, OnInit} from '@angular/core';
import {HeaderColumn} from "../intermediary/entities/header-column";
import {DogHttpService} from "../../services/dog-http.service";
import {Response} from "../../entities/response";
import {Dog} from "../../entities/dog";
import {Breed} from "../../entities/breed";
import {DynamicValidationForm} from "../intermediary/entities/dynamic-validation-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BreedHttpService} from "../../services/breed-http.service";

@Component({
  selector: 'to-do-one-to-many',
  templateUrl: './to-do-one-to-many.component.html',
  styleUrl: './to-do-one-to-many.component.css'
})
export class ToDoOneToManyComponent implements OnInit{

  // ************** Tree Table
  protected tableTitle! : string
  protected data! : any
  protected dataId! : { field:string,value?:any }
  protected subData! : any[]
  protected enableNestedTable : boolean = false;
  protected headerColumns! : HeaderColumn[]
  protected subHeaderColumns! : HeaderColumn[]

  // ************** Tree Table
  protected formTitle! : string;
  protected formGroup!: FormGroup;
  protected dynamicValidationsForm!: DynamicValidationForm[];


  constructor(private readonly dogHttpService:DogHttpService,
              private readonly breedHttpService: BreedHttpService,)  {
  }

  ngOnInit(): void {
    this.setupTreeTable()
    this.setupFromGroup()
  }

  // ************** Table
  private setupTreeTable() : void {
    this.tableTitle = 'Dog & Breed Tree Table'
    this.dogHttpService.getSelectAll().subscribe((response : Response<Dog[]>) : void => {
      this.data = response.data
      this.headerColumns = this.convertObjectToHeaderColumns(new Dog(),['bid'])
      this.subHeaderColumns = this.convertObjectToHeaderColumns(new Breed(),['bid'])
      this.dataId = { // importance for toggle sub table // ** the field should map same name pk of your main table
        field : 'did'
      }
    })
  }

  // ************** Form
  private setupFromGroup() : void {
    this.formTitle = 'Dog & Breed Validation Form';
    this.formGroup = new FormGroup({})
    this.dynamicValidationsForm = []
    let options : {value:string,label:string,id:string}[] = []
    options.push({value:'1',label:'Affenpinscher',id:'aid'})
    options.push({value:'2',label:'Airedale Terrier',id:'atid'})
    options.push({value:'3',label:'Barbet',id:'bid'})
    options.push({value:'4',label:'English Foxhound',id:'efid'})
    options.push({value:'6',label:' Bullmastiff',id:'bfid'})
    this.dynamicValidationsForm.push({
      id: 'sku',
      label: 'Sku : ',
      type: 'text',
      formControlName: 'sku',
      formControl: new FormControl('1000000000', [Validators.required,Validators.maxLength(10)]),
      invalidMessage: '* Invalid sku',
      placeholder: 'Ex, 1000000000,...',
      isInputText: true,
    })
    this.dynamicValidationsForm.push({
      id: 'nickname',
      label: 'Nickname : ',
      type: 'text',
      formControlName: 'nickname',
      formControl: new FormControl('Jack', Validators.required),
      invalidMessage: '* Invalid nickname',
      placeholder: 'Ex, Alex,...',
      isInputText: true,
    })
    this.dynamicValidationsForm.push({
      id: 'age',
      label: 'Age : ',
      type: 'number',
      formControlName: 'age',
      formControl: new FormControl(1, [Validators.required, Validators.maxLength(3)]),
      invalidMessage: '* Invalid age',
      placeholder: '0',
      isInputText: false,
      isInputNumber: { step:1 },
    })
    this.dynamicValidationsForm.push({
      id: 'alive',
      label: 'Alive ',
      type: 'checkbox',
      formControlName: 'alive',
      formControl: new FormControl(null),
      invalidMessage: null,
      placeholder: null,
      isInputText: false,
      isCheckbox: { validate : false} ,
    })
    this.dynamicValidationsForm.push({
      id: 'breed',
      label: 'Breeds : ',
      type: 'radio',
      formControlName: 'breed',
      formControl: new FormControl('1', [Validators.required]), // '0' is mean {value:'0',label:'Select One'} for default
      invalidMessage: null,
      placeholder: null,
      isInputText: false,
      isRadio: {
        options : options
      } ,
    })
  }

  protected setInitialData($event: any[]): void {
    this.data = $event // bind data
  }

  protected setEditEvent($even : any): void {
  }

  protected setRemoveEvent($even : any) : void {
    this.dogHttpService
      .getDeleteAll(Number($even['did']))
      .subscribe((res : Response<boolean>) : any => (res.data ? this.setupTreeTable() : null))
  }

  protected setTreeTableEvent($event: any) : void {
    this.dataId.value = $event['did'] // store uuid of student then search uuid of student with stUuid of project
    this.enableNestedTable = true
    this.data.forEach((item:Dog ) : void => {
      if (item.did === this.dataId.value) {
        this.breedHttpService.getSelectOne(Number(item.bid)).subscribe((res: Response<Breed>): void => {
          if (res.status === 200) {
            this.subData = []
            this.subData.push(res.data)
          }
        })
      }
    })
  }

  protected setCloseTreeTableEvent(): void {
    this.enableNestedTable = false
  }

  // very importance for working this.formGroup on this child component
  protected setInitialFormGroup($event: FormGroup): void {
    this.formGroup = $event;
  }

  protected setSubmitEventFormGroup(): void {
    if (this.formGroup.valid) {
      const values : any = this.formGroup.value
      const dog :Dog = new Dog()
      dog.nickname = values['nickname']
      dog.sku = values['sku']
      dog.bid = Number(values['breed'])
      dog.age = values['age']
      dog.alive = (!(values['alive'] === null || values['alive'] === false))
      this.dogHttpService
        .getInsertOne(dog)
        .subscribe((res : Response<boolean>) : any =>(res.data ? this.setupTreeTable() : null))
    }
  }

  protected setClearEventFormGroup() : void {
    this.formGroup.reset()
  }

  // ************** Helpers Create Dynamic Columns
  private convertObjectToHeaderColumns(object: any, ignoreKeys: string[]): HeaderColumn[] {
    let headerColumns : any = []
    const objectKeys :string[] = Object.keys(object)
    for (let key of objectKeys) {
      if (ignoreKeys.indexOf(key) === -1) {
        headerColumns.push({field: key, header: key.toUpperCase()})
      }
    }
    if (ignoreKeys.indexOf('action') === -1) { // if -1 is mean not found
      headerColumns.push({field: 'action', header: 'action'.toUpperCase()})
    }
    return headerColumns
  }
}
