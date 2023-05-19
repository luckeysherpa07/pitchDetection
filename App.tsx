import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {PitchDetector} from 'react-native-pitch-detector';

const App = () => {
  const [pitch, setPitch] = useState('');

  const subscription = PitchDetector;

  const onPressStartButton = async () => {
    // To start recording
    await subscription.start();

    PitchDetector.addListener(({tone}) => {
      setPitch(tone);
    });
  };

  const onPressStopButton = async () => {
    subscription.stop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.noteContainer}>
        <Text>A</Text>
      </View>
      <View style={styles.noteContainer}>
        <Text>B</Text>
      </View>
      <View style={styles.noteContainer}>
        <Text>C</Text>
      </View>
      <View style={styles.noteContainer}>
        <Text>D</Text>
      </View>
      <View style={styles.noteContainer}>
        <Text>E</Text>
      </View>
      <View style={styles.noteContainer}>
        <Text>F</Text>
      </View>
      <View style={styles.noteContainer}>
        <Text>G</Text>
      </View>
      <Text style={styles.pitchText}>Pitch:</Text>
      <Text style={styles.pitchText}>{pitch}</Text>
      <Button onPress={() => onPressStartButton()} title="Start" />
      <Button onPress={() => onPressStopButton()} title="Stop" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pitchText: {
    fontSize: 24,
  },
  noteContainer: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    margin: 10,
  },
});

export default App;
