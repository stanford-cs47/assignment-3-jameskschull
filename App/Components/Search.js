/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React, { Component, useState } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Metrics, Colors } from '../Themes'

import { AntDesign } from '@expo/vector-icons';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';

// export default class Search extends Component {

//   render () {
//     return (
//       <View> {/*Some styles with a fancy background and padding...*/}

//         {/*user input and a search button!*/}

//       </View>
//     );
//   }
// }



export default function Search(props) {
  const [searchText, setSearchText] = useState("");

  submitSearch = () => {
    props.searchForArticles(searchText);
    setSearchText('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.searchBar}> 

      {/*user input and a search button!*/}
      <TextInput style={styles.textinput}
                 placeholder={'Search for News'}
                 onChangeText={text => setSearchText(text)}
                 onSubmitEditing={this.submitSearch}
                 value={searchText}
                 ></TextInput>

      <TouchableOpacity style={styles.searchIcon}
                        onPress={this.submitSearch}>
        <AntDesign name="search1" size={20} color="orange" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: Colors.cloud,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 10,
  },
  textinput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    marginLeft: 10,
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 8
  }
});
