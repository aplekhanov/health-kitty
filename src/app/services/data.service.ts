import { Injectable } from '@angular/core';
import {
  ActivityData,
  CapacitorHealthkit,
  OtherData,
  QueryOutput,
  SampleNames,
  SleepData,
} from '@perfood/capacitor-healthkit';

const READ_PERMISSIONS = ['activity', 'distance'];


export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: string;
  duration: number;
  totalFlightsClimbed: number;
  totalSwimmingStrokeCount: number;
  totalEnergyBurned: number;
  totalDistance: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: string): Message {
    const foundMessage = this.messages.find(message => message.id === id);
    if (foundMessage) {
      return foundMessage;
    } else {
      const errorMessage: Message = {
        fromName: "Unknown",
        subject: "Error",
        date: "",
        id: "",
        duration: 0,
        totalFlightsClimbed: 0,
        totalSwimmingStrokeCount: 0,
        totalEnergyBurned: 0,
        totalDistance: 0,
      };
      return errorMessage;
    }
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
      this.messages = [];

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
        this.messages.push(newMessage);
      }

    } catch (error) {
      console.error(error);
    }
  }

}
