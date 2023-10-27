import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import {TabMenuModule} from 'primeng/tabmenu';
import { TableComponent } from './shared/table/table.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RoundToggleBottonComponent } from './shared/round-toggle-botton/round-toggle-botton.component';
import { CheckboxSNComponent } from './shared/checkbox-sn/checkbox-sn.component';
import { ConfirmationService } from "primeng/api";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { LoginComponent } from './private/admin/authentication/components/login/login.component';
import { MessagesModule } from 'primeng/messages';
@NgModule({
  declarations: [  
    TableComponent, RoundToggleBottonComponent, CheckboxSNComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    SidebarModule,
    RadioButtonModule,
    DropdownModule,
    CalendarModule,
    TabViewModule,
    InputMaskModule,
    AutoCompleteModule,
    TableModule,
    TabMenuModule,
    InputNumberModule,
    SelectButtonModule,
    AccordionModule,
    DialogModule,
    ToggleButtonModule,
    ConfirmDialogModule
  ], exports: [
    FormsModule,
    SidebarModule,
    RadioButtonModule,
    DropdownModule,
    CalendarModule,
    TabViewModule,
    InputMaskModule,
    AutoCompleteModule,
    TableModule,
    TabMenuModule,
    ReactiveFormsModule,
    TableComponent,
    InputNumberModule,
    SelectButtonModule,
    AccordionModule,
    DialogModule,
    ToggleButtonModule,
    RoundToggleBottonComponent,
    MessagesModule,
    CheckboxSNComponent,
    ConfirmDialogModule,
  ], providers: [ConfirmationService]
})
export class ComponentesModule { }
