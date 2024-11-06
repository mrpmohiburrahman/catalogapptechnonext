// src/components/Timestamp.tsx
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  startListening,
  stopListening,
  type TimestampEvent,
} from '@/native/timestamp-module';
import { setTimestamp } from '@/redux/slices/timestamp-slice';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Timestamp = () => {
  const dispatch = useAppDispatch();
  const timestamp = useAppSelector((state) => state.timestamp.currentTimestamp);

  useEffect(() => {
    const handleTimestampEvent = (event: TimestampEvent) => {
      console.log('Received timestamp event:', event.timestamp);
      const date = new Date(event.timestamp);
      const formatted = format(date, 'PPpp');
      dispatch(setTimestamp(formatted));
    };

    // Start listening to native events
    startListening(handleTimestampEvent);
    console.log('Started listening to TimestampEvent.');

    // Cleanup on unmount
    return () => {
      stopListening();
      console.log('Stopped listening to TimestampEvent.');
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{timestamp}</Text>
    </View>
  );
};

export default Timestamp;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});
