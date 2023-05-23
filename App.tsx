import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {PitchDetector} from 'react-native-pitch-detector';

const App = () => {
  const [pitch, setPitch] = useState('');
  const [songNote, setSongNote] = useState('ABCDEF');

  useEffect(() => {
    var firstLetter = songNote.substring(0, 1);
    if (pitch == firstLetter) {
      var remainingNotes = songNote.substring(1);
      setSongNote(remainingNotes);
    }
  }, [pitch]); // <- add the count variable here

  const subscription = PitchDetector;

  const onPressStartButton = async () => {
    // To start recording
    await subscription.start();

    PitchDetector.addListener(({tone}: any) => {
      setPitch(tone);
    });
  };

  const onPressStopButton = async () => {
    subscription.stop();
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Note = ({note}: any) => {
    return (
      <View
        style={[
          styles.noteContainer,
          { backgroundColor: pitch == note ? 'red' : '#ADD8E6' },
        ]}>
        <Text>{note}</Text>
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const SongNotes = () => {
    return (
      <View>
        <Text>{songNote}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Note note="A" />
      <Note note="B" />
      <Note note="C" />
      <Note note="D" />
      <Note note="E" />
      <Note note="F" />
      <Note note="G" />
      <SongNotes />
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
