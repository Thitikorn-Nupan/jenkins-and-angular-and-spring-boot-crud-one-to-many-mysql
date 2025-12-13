import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  DynamicValidationFormComponent
} from "./components/intermediary/dynamic-validation-form/dynamic-validation-form.component";
import {DynamicTreeTableComponent} from "./components/intermediary/dynamic-table/dynamic-tree-table.component";
import {
  DynamicDialogConfirmComponent
} from "./components/intermediary/dynamic-dialog-confirm/dynamic-dialog-confirm.component";
import {DynamicDialogFormComponent} from "./components/intermediary/dynamic-dialog-form/dynamic-dialog-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToDoOneToManyComponent} from "./components/to-do-one-to-many/to-do-one-to-many.component";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    DynamicValidationFormComponent,
    DynamicTreeTableComponent,
    DynamicDialogConfirmComponent,
    DynamicDialogFormComponent,
    ToDoOneToManyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()) // for http client
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
