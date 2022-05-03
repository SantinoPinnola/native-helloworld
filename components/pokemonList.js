import React from "react";
import { StyleSheet, Text, View, Image, Button, FlatList, Alert} from 'react-native';

export default class PokemonList extends React.Component {
    state = {
        loading : false,
        pokemon : [],
        url : "https://pokeapi.co/api/v2/pokemon/",
        previous : ""
    }

    componentDidMount() {
        this.getPokemon();
    }

    getPokemon = () => {
        this.setState({loading : true})
        fetch(this.state.url)
        .then(res => res.json())
        .then (res => {
            this.setState({
                pokemon : res.results,
                url : res.next,
                previous : res.previous,
                loading : false
            });
        });
    }

    goPrevious = () => {
        this.setState({loading : true})
        if(this.state.previous == null) {
            return Alert.alert("Erros", "No existen paginas previas!")
        } else {
        fetch(this.state.previous)
            .then(res => res.json())
            .then (res => {
                this.setState({
                    pokemon : res.results,
                    url : res.next,
                    previous : res.previous,
                    loading : false
                });
            });
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <FlatList
                data={this.state.pokemon}
                renderItem={
                    ({item}) => <Text style={styles.item}>{ item.name }</Text>
                }
                keyExtractor={(item, index) => index.toString()}
                />
            <Button
                title="Next"
                color="black"
                onPress={this.getPokemon}
                />
             <Button
                title="Previous"
                color="black"
                onPress={this.goPrevious}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
    },
    item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 1,
    fontSize : 16,
  },
    tinyLogo: {
      width: 50,
      height: 50,
    }
  });