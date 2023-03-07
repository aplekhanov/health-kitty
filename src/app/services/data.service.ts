import { Injectable } from '@angular/core';

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
}
