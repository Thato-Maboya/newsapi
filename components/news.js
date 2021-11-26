import { Link } from "@react-navigation/native";
import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,WebView } from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Everything from "./Everything";
import ResultsNotFound from "./ResultsNotFound";
const News = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const [news, setNews] = useState("")
    const [country, setCountry] = useState("")
    const [profiles, setProfiles] = useState([])
    const [articles, setArticles] = useState("")
    const [title, setTitle] = useState("")
    const { url,seturl }=useState("")
    const API_KEY = "792207d47f214514930e6c09ba6a2430"

    // https://newsapi.org/v2/top-headlines?country=us&apiKey=5e22e059dc00400db652e46d6a1ec1d5

    const fetchData = () => {
        if (country == '') {
            fetch("https://newsapi.org/v2/top-headlines?country="+ country +"&apiKey=" + API_KEY)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setNews(data)
                setcontent()
                setProfiles(data.articles)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
        } else {
            
        }
        
    }
    

    useEffect(() => {
        console.log("use effect called")
        fetchData()
    }, [])
    return (
        <View style={styles.container}>
            <Image source={require('../assets/background.jpg')}
                style={StyleSheet.absoluteFillObject}
            //blurRadius={200}
            />
            <View style={styles.searchCard}>
                <TextInput style={styles.input} placeholder={"User Name"} onChangeText={(e) => setNews(e)} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => searchbynews()}>
                        <Text style={styles.btnText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchCard} >
                <TouchableOpacity style={styles.btn} onPress={() => bytopic()}>
                    <Text style={{ color: 'white' }}>top-headlines</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => Bycontent()}>
                    <Text style={{ color: 'white' }}>Everything</Text>
                </TouchableOpacity>
            </View>
            <View>
                {profiles.length ?
                    <View>
                        {profiles.map(articles => (
                            <View key={articles.name} style={styles.cardview}>
                                <Image style={{
                                    width: 70, height: 70, borderRadius: 50, marginRight: 10
                                }}
                                    source={{ uri: articles.urlToImage }}
                                />
                                <View style={styles.wrapText}>
                                    <Text style={{ fontSize: 15, fontWeight: '800', color: 'red' }}>
                                        {articles.author}
                                    </Text>
                                    <Text style={{ fontSize: 13, fontWeight: '600', color: 'black' }}>
                                        {articles.title}
                                    </Text>
                                    <Text style={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                                        {articles.publishedAt}
                                    </Text>
                                    <TouchableOpacity onPress={() =>byurl ()}>
                                        <Text style={{ color: 'blue' }}>News</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Everything', { articlesURI: articles.url })}>
                                        <Text style={{ color: 'white' }}>News</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                </View>
                            </View>
                        ))
                        }
                    </View>
                    :
                    <ResultsNotFound />
                }
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    searchCard: {
        flexDirection: 'row',
        padding: 20,
        marginBottom: 10,
        margin: 10,
        borderRadius: 12,
        backgroundColorwhite: 'white',
    },
    input: {
        paddingVertical: 15,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 1,
        width: 270
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 4,
        backgroundColor: 'black'
    },
    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'pink'
    },
    cardview: {
        flexDirection: 'row',
        padding: 20,
        marginBottom: 10,
        margin: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 5,
        shadowRadius: 20
    },
    wrapText: {
        width: "65%"
    },
    listItemLeft: {
        fontWeight: "bold",
        margin: 3
    },
});
export default News
