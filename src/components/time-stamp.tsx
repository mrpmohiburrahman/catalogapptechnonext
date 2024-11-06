// src/components/Timestamp.tsx
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { setTimestamp } from '@/redux/slices/timestamp-slice';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Timestamp = () => {
  const dispatch = useAppDispatch();
  const timestamp = useAppSelector((state) => state.timestamp.currentTimestamp);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = format(now, 'PPpp');
      dispatch(setTimestamp(formatted));
    }, 20000); // every 20 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{timestamp}</Text>
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
});
