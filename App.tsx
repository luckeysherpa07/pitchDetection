import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { PitchDetector } from 'react-native-pitch-detector';

const App = () => {
  const [pitch, setPitch] = useState('');
  const [songNote, setSongNote] = useState('');
  const subscription = PitchDetector;
  var allNotes = [
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B',
    'c',
    'd',
    'e',
    'f',
    'g',
    'a',
    'b',
    "c'",
    "d'",
    "e'",
    "f'",
    "g'",
    "a'",
    "b'",
  ];

  var abcNotation = `
  cdef|g2fe|dcBA|G2c2|
  cdef|g2fe|dcBA|G2c2|`;

  var extractedABCNotation = abcNotation
    .replace(/\||\n/g, '')
    .replace(/(.)2/g, (match, char) => char + char)
    .replace(/\s/g, '');

  useEffect(() => {
    var firstLetter = songNote.substring(0, 1);
    if (pitch == firstLetter) {
      var remainingNotes = songNote.substring(1);
      setSongNote(remainingNotes);
    }
  }, [pitch]);

  useEffect(() => {
    setSongNote(extractedABCNotation);
  },[]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Note = ({ note }: any) => {
    return (
      <View
        style={[
          styles.noteContainer,
          { backgroundColor: pitch == note ? 'red' : '#ADD8E6' },
        ]}>
        <Text style={{ color: 'black' }}>{note}</Text>
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const SongNotes = () => {
    const views = [];

    for (let i = 0; i < songNote.length; i++) {
      const char = songNote.charAt(i);
      views.push(
        <View key={i} style={styles.songNoteItem}>
          <Text>{char}</Text>
        </View>,
      );
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.songNoteContainer}>{views}</View>
      </ScrollView>
    );
  };

  const onPressStartButton = async () => {
    // To start recording
    await subscription.start();

    PitchDetector.addListener(({ tone, frequency }: any) => {
      var note;

      if (frequency >= 130 && frequency <= 262) {
        note = tone;
      } else if (frequency > 262 && frequency <= 525) {
        note = tone.toLowerCase();
      } else if (frequency > 525 && frequency <= 1000) {
        note = tone.toLowerCase() + "'";
      } else {
        note = '-';
      }

      console.log('CHANGED NOTE', frequency, note); // Output: 'E' (for frequency = 350)
      setPitch(note);
    });
  };

  const onPressStopButton = async () => {
    subscription.stop();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View>
          {allNotes
            .slice(0)
            .reverse()
            .map((note, index) => (
              <Note note={note} key={index} />
            ))}
        </View>
        <SongNotes />
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
    padding: 2,
    margin: 2,
    textDecorationColor: 'black',
  },
  songNoteItem: {
    backgroundColor: '#D9544D',
    padding: 10,
    margin: 10,
  },
  songNoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  }
});

export default App;
