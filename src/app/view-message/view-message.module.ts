import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewMessagePage } from './view-message.page';
import { MessageComponentModule } from '../message/message.module';
import { IonicModule } from '@ionic/angular';

import { ViewMessagePageRoutingModule } from './view-message-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    ViewMessagePageRoutingModule
  ],
  declarations: [ViewMessagePage]
})
export class ViewMessagePageModule {}
