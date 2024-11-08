import {
  type EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

const { TimestampModule } = NativeModules;

// Create an event emitter
const timestampEmitter = new NativeEventEmitter(TimestampModule);

export type TimestampEvent = {
  timestamp: number;
};

let subscription: EmitterSubscription | null = null;

export const startListening = (callback: (event: TimestampEvent) => void) => {
  if (!subscription) {
    subscription = timestampEmitter.addListener('TimestampEvent', callback);
    console.log('Listener added to TimestampEvent.');
  }
};

export const stopListening = () => {
  if (subscription) {
    subscription.remove();
    subscription = null;
    console.log('Listener removed from TimestampEvent.');
  }
};
