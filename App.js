import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { distanceInWords, differenceInMinutes, format } from 'date-fns';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { times: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      times: [ ...this.state.times, new Date() ]
    })
  }

  render() {
    const { times } = this.state;

    if (times.length > 1) {
      this.state.diff = times[times.length - 1] - times[0];
      this.state.avg = this.state.diff / (times.length - 1);
    }

    return (
      <View style={{ flex: 1, paddingTop: 40, justifyContent: 'center' }}>
        <Text>{this.state.avg > 0 ? `avg time between contractions: ${(this.state.avg / 1000 / 60).toFixed(1)}mins (${(60 / (this.state.avg / 1000 / 60)).toFixed(1)} per hr)` : ''}</Text>
        <ScrollView
          style={{ marginBottom: 100 }}
        >
          {times.length > 0 && times.map((time, i, a) => (
            <View
              key={format(time)}
            >
              <Text>{format(time, 'HH:mm:ss')} {i > 0 && distanceInWords(time, a[i - 1])}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, backgroundColor: 'pink', paddingTop: 30}}>
          <Button
            title="NOW!"
            onPress={this.handleClick} />
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    zIndex: 100,
    position: 'absolute',
    top: '70%'
  }
});
