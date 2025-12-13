import {FormControl} from "@angular/forms";

interface Dropdown {
  value: string;
  label: string;
}

interface Radio {
  value: string;
  label: string;
  id: string;
}

export interface DynamicValidationForm {
  id: string;
  label: string;
  type: string | null;
  formControlName: string
  invalidMessage: string | null
  formControl:FormControl
  placeholder: string | null
  isInputText : boolean
  isInputNumber ?: { step: number }
  isTextarea? : boolean
  isDropdown? : { options: Dropdown[] }
  isCheckbox? : { validate : boolean }
  isRadio? : { options : Radio[] }
  isReadOnly?: boolean
  isDate?: boolean
}
