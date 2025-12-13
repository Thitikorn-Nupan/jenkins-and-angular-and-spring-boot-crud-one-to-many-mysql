export interface DynamicDialogConfirm {
  dialogTitle : string
  type : 'confirm' | 'warning' | 'error' | 'check';
  content : string
}
