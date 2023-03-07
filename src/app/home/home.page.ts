import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private data: DataService) { }

  
  async refresh(ev: any) {
    try {
      // Call getActivityData method
      await this.data.getActivityData();
  
      // Complete the refresh operation
      (ev as RefresherCustomEvent).detail.complete();
    } catch (error) {
      console.error(error);
    }
  }
  
  getMessages(): Message[] {
    return this.data.getMessages();
  }

  async getWorkouts() {
    await this.data.getActivityData();
  }
}
