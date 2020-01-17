
import React from 'react';
import nodejs from 'nodejs-mobile-react-native'
import {Text, View, Button} from 'react-native'

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {lastNodeMessage : "No message yet."};
    this.listnerRef = null;
  }
  componentWillMount()
  {
    nodejs.start('main.js');
    this.listnerRef = ((msg) => {
      this.setState({lastNodeMessage : msg});
    });
    nodejs.channel.addListener(
      "message",
      this.listnerRef,
      this
    );
  }
  render(){
    return(
      <View>
        <Button title = "run dial"
        onPress = {() => nodejs.channel.send('start')}
        />
        <Button title = "stop Dial"
        onpress = {()=> nodejs.channel.send('stop')}
        />
        <Text>
          {this.state.lastNodeMessage}
        </Text>
      </View>
    )
  }
}