import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import {
  ActivityData,
  CapacitorHealthkit,
  OtherData,
  QueryOutput,
  SampleNames,
  SleepData,
} from '@perfood/capacitor-healthkit';

const READ_PERMISSIONS = ['activity'];


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
      await this.getActivityData();
  
      // Complete the refresh operation
      (ev as RefresherCustomEvent).detail.complete();
    } catch (error) {
      console.error(error);
    }
  }
  

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  public async getActivityData(): Promise<void> {
    
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 7);
    
    try {

      await CapacitorHealthkit.requestAuthorization({
        all: [''],
        read: READ_PERMISSIONS,
        write: [''],
      });

      const queryOptions = {
        sampleName: SampleNames.WORKOUT_TYPE,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 0,
      };

      const queryResults =  await CapacitorHealthkit.queryHKitSampleType<ActivityData>(queryOptions);
      this.data.messages = [];

      for (const result of queryResults.resultData) {
        const newMessage: Message = {
          fromName: result.source,
          subject: result.workoutActivityName,
          date: result.startDate,
          id: result.uuid,
          duration: result.duration,
          totalFlightsClimbed: result.totalFlightsClimbed,
          totalSwimmingStrokeCount: result.totalSwimmingStrokeCount,
          totalEnergyBurned: result.totalEnergyBurned,
          totalDistance: result.totalDistance,
        };
        this.data.messages.push(newMessage);
      }

    } catch (error) {
      console.error(error);
    }
  }

}
