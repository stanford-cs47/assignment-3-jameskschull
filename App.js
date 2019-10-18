/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React from 'react';
import { Linking, ActivityIndicator, StyleSheet, Text, View, Image, SafeAreaView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  componentDidMount() {
    this.loadArticles();
  }

  keyExtractor = index => {
    return this.state.articles[index].url;
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  searchForArticles = (searchTerm) => {
    this.loadArticles(searchTerm=searchTerm);
  }  

  goToArticle = item => {
    Linking.openURL(item.url).catch((err) => console.error('An error occurred', err));
  }

  // renderArticle = (index, item) => (
  //   <TouchableOpacity onPress={() => this.goToArticle(item)}>
  //       <View style={styles.article}>
  //     <Text style={{fontSize: 24}}>{item.title}</Text>
  //     <Text>{item.snippet}</Text>
  //     <Text style={{fontWeight: 'bold'}}>{item.byline}</Text>
  //     <Text style={{color: 'gray'}}>{item.date}</Text>
  //     </View>
  //   </TouchableOpacity>
  // )

  renderArticle = (index, item) => {
    return (
      <TouchableOpacity onPress={() => this.goToArticle(item)}>
          <View style={styles.article}>
        <Text style={{fontSize: 24}}>{item.title}</Text>
        <Text>{item.snippet}</Text>
        <Text style={{fontWeight: 'bold'}}>{item.byline}</Text>
        <Text style={{color: 'gray'}}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {articles, loading} = this.state;
    
    let contentDisplayed = null;

    if (loading) {
      contentDisplayed = <ActivityIndicator style={styles.loading}/>
    } else {
      contentDisplayed = <FlatList
                            data={this.state.articles} style={styles.list}
                            // We encapsulated the code for renderItem into renderTodo.
                            renderItem={({ index, item }) => this.renderArticle(index, item)}
                            keyExtractor={(item, index) => this.keyExtractor(index)}
                          />
    }

    return (
      <SafeAreaView style={styles.container}>

        {/*First, you'll need a logo*/}
        <Image style={styles.logo}
               source={Images.logo}/>

        {/*Then your search bar*/}
        <Search searchText = {this.state.searchText}
                searchForArticles = {this.searchForArticles}/>

        {/*And some news*/}
        
        {contentDisplayed}

        {/*Though, you can style and organize these however you want! power to you 😎*/}

        {/*If you want to return custom stuff from the NYT API, checkout the APIRequest file!*/}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textinput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1
  },
  logo: {
    width: '90%',
    resizeMode: 'contain',
    height: '12%',
  },
  list: {
    marginTop: 10,
  },
  article: {
    width: '100%',
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: (3/10) * Dimensions.get('window').height 
  }
});
