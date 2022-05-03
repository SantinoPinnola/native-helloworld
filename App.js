import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import pokeballImage from './assets/pokeball.png';
import PokemonList from './components/pokemonList';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading : true,
      setList : false,
    }
  
  }

  componentDidMount() {
    this.setState({loading : false})
  }

  showlist = () => {
    this.setState({setList : !this.state.setList});
  }


  render () {
    if (this.state.setList == false) {
      return (
        <View style={styles.container}>
          <Image 
          source={pokeballImage}
          style={styles.tinyLogo}
          />
          <Button 
          onPress={this.showlist}
          color="#ad0303"
          title="See Pokemon list"
          />
          <StatusBar style="auto" />
        </View> 
      );
    } else {
      return (
        <View style={styles.list}>
        <PokemonList/>
        <Button
        title='Go back'
        color="black"
        onPress={this.showlist}
        />
        </View>
      )
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list : {
    flex: 1,
    backgroundColor: 'red',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  }
});
