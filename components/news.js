//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Picker } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import Loading from './loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, Feather, } from '@expo/vector-icons';

// create a component
const News = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const api_key = '5e22e059dc00400db652e46d6a1ec1d5'
    const [country, setCountry] = useState();
    const [query = 'bitcoin', setQuery] = useState();
    const [profiles, setProfiles] = useState([])
    const [count, setCount] = useState()
    const [selectedValue, setSelectedValue] = useState();
    const [decimalInputPage, setDecimalInputPage] = useState('')
    const [decimalInputPageSize, setDecimalInputPageSize] = useState('')
    const validator = /^[+-]?\d*(?:[.,]\d*)?$/;

    // https://newsapi.org/v2/everything?q=bitcoin&apiKey=5e22e059dc00400db652e46d6a1ec1d5
    // https://newsapi.org/v2/everything?q=bitcoin&apiKey=5e22e059dc00400db652e46d6a1ec1d5&pageSize=15&page=3
    // https://newsapi.org/v2/top-headlines?country=us&apiKey=5e22e059dc00400db652e46d6a1ec1d5
    // https://newsapi.org/v2/top-headlines?country=sa&apiKey=5e22e059dc00400db652e46d6a1ec1d5&pageSize=15&page=3
    // aearataubebgbrcachcn cocuczdeegfrgbgrhkhu idieilinitjpkrltlvma mxmyngnlnonzphplptro rsrusasesgsiskthtrtwuausveza
    const search = () => {

        if (country && selectedValue == 'top-headlines') { 
            if (decimalInputPage && decimalInputPageSize) {
                fetch('https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=' + api_key + '&pageSize=' + decimalInputPageSize + '&page=' + decimalInputPage)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setProfiles(data.articles)
                    setCount(data.totalResults)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setLoading(false))
            } else {
                fetch('https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=' + api_key)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setProfiles(data.articles)
                    setCount(data.totalResults)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setLoading(false))
            }
            
        } else {
            if (decimalInputPage && decimalInputPageSize) {
                fetch('https://newsapi.org/v2/everything?q=' + query + '&apiKey=' + api_key + '&pageSize=' + decimalInputPageSize + '&page=' + decimalInputPage)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setProfiles(data.articles)
                    setCount(data.totalResults)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setLoading(false))
            } else {
                fetch('https://newsapi.org/v2/everything?q=' + query + '&apiKey=' + api_key)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setProfiles(data.articles)
                    setCount(data.totalResults)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setLoading(false))
            }
            
        }
    }

    useEffect(() => {
        setLoading(true)
        search()
    }, [])

    function onNumberInputChangePage(text) {
        if (validator.test(text)) {
            text = text.replace(",", ".") //this is optional
            setDecimalInputPage(text);
        }
        else {
            //this will remove the last character as it didn't succeed validation
            setDecimalInputPage(text.substring(0, text.length - 1));
        }
    }

    function onNumberInputChangePageSize(text) {
        if (validator.test(text)) {
            text = text.replace(",", ".") //this is optional
            setDecimalInputPageSize(text);
        }
        else {
            //this will remove the last character as it didn't succeed validation
            setDecimalInputPageSize(text.substring(0, text.length - 1));
        }
    }


    console.log(selectedValue);
    console.log(country);
    console.log(decimalInputPageSize);
    console.log(decimalInputPage);

    return (
        <View>
            <View>
                <Image source={require('../assets/thato.jpg')} style={StyleSheet.absoluteFillObject} />
                <View style={styles.InlineRow}>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.Picker}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Select Endpoint" value="" />
                        <Picker.Item label="Everything" value="everything" />
                        <Picker.Item label="Top-Headlines" value="top-headlines" />
                    </Picker>
                    <Picker
                        country={country}
                        style={styles.Picker}
                        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                    >
                        <Picker.Item label="Select country" value="" />

                        <Picker.Item label="ae" value="ae" />
                        <Picker.Item label="ar" value="ar" />
                        <Picker.Item label="at" value="at" />
                        <Picker.Item label="au" value="au" />
                        <Picker.Item label="be" value="be" />
                        <Picker.Item label="bg" value="bg" />
                        <Picker.Item label="br" value="br" />
                        <Picker.Item label="ca" value="ca" />
                        <Picker.Item label="ch" value="ch" />
                        <Picker.Item label="cn" value="cn" />

                        <Picker.Item label="co" value="co" />
                        <Picker.Item label="cu" value="cu" />
                        <Picker.Item label="cz" value="cz" />
                        <Picker.Item label="de" value="de" />
                        <Picker.Item label="eg" value="eg" />
                        <Picker.Item label="fr" value="fr" />
                        <Picker.Item label="gb" value="gb" />
                        <Picker.Item label="gr" value="gr" />
                        <Picker.Item label="hk" value="hk" />
                        <Picker.Item label="hu" value="hu" />

                        <Picker.Item label="id" value="id" />
                        <Picker.Item label="ie" value="ie" />
                        <Picker.Item label="il" value="il" />
                        <Picker.Item label="in" value="in" />
                        <Picker.Item label="it" value="it" />
                        <Picker.Item label="jp" value="jp" />
                        <Picker.Item label="kr" value="kr" />
                        <Picker.Item label="lt" value="lt" />
                        <Picker.Item label="lv" value="lv" />
                        <Picker.Item label="ma" value="ma" />

                        <Picker.Item label="mx" value="mx" />
                        <Picker.Item label="my" value="my" />
                        <Picker.Item label="ng" value="ng" />
                        <Picker.Item label="nl" value="nl" />
                        <Picker.Item label="no" value="no" />
                        <Picker.Item label="nz" value="nz" />
                        <Picker.Item label="ph" value="ph" />
                        <Picker.Item label="pl" value="pl" />
                        <Picker.Item label="pt" value="pt" />
                        <Picker.Item label="ro" value="ro" />

                        <Picker.Item label="rs" value="rs" />
                        <Picker.Item label="ru" value="ru" />
                        <Picker.Item label="sa" value="sa" />
                        <Picker.Item label="se" value="se" />
                        <Picker.Item label="sg" value="sg" />
                        <Picker.Item label="si" value="si" />
                        <Picker.Item label="sk" value="sk" />
                        <Picker.Item label="th" value="th" />
                        <Picker.Item label="tr" value="tr" />
                        <Picker.Item label="tw" value="tw" />
                        <Picker.Item label="ua" value="ua" />
                        <Picker.Item label="us" value="us" />
                        <Picker.Item label="ve" value="ve" />
                        <Picker.Item label="za" value="za" />
                    </Picker>

                </View>
                <View style={styles.InlineRow}>
                    <TextInput
                        style={styles.Pagination}
                        value={decimalInputPageSize}
                        onChangeText={(text) => {
                            setDecimalInputPageSize(text);
                            onNumberInputChangePageSize(text);
                        }}
                        placeholder={"PageSize Number"}
                        keyboardType="numeric"
                        placeholderTextColor="#ccc">
                    </TextInput>
                    <TextInput
                        style={styles.Pagination}
                        value={decimalInputPage}
                        onChangeText={(text) => {
                            setDecimalInputPage(text);
                            onNumberInputChangePage(text);
                        }}
                        placeholder={"Page Number"}
                        keyboardType="numeric"
                        placeholderTextColor="#ccc">
                    </TextInput>
                </View>
                <View style={styles.InlineRow}>
                    <TextInput
                        style={styles.SearchInput}
                        placeholder='Search query name'
                        autoCapitalize="none"
                        onChangeText={(e) => setQuery(e)}
                    />

                    <TouchableOpacity style={styles.SearchBtn} onPress={() => search()}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View>
                {
                    loading ? <Loading></Loading> :
                        profiles.length ?
                            <View>
                                <View style={styles.UserResultsCount}>
                                    <Text style={{ fontSize: 20, fontWeight: 'Bold', }}>{count} Results Found</Text>
                                </View>
                                <View>
                                </View>
                                {
                                    profiles.map(user => [
                                        <View style={{ backgroundColor: 'lime', margin: 10, borderRadius: 10, shadowColor: 'lime', shadowOffset: { width: 0, height: 10 } }}>
                                            <View key={user.id} style={styles.Users}>
                                                <View>
                                                    <Text>
                                                        {user.author}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Image source={{ uri: user.urlToImage }} style={styles.LogoImg} />
                                                </View>
                                            </View>
                                            <TouchableOpacity style={styles.ReposBtn} onPress={() => navigation.navigate('url', { repoURL: user.url })}>
                                                <Text style={styles.ViewURL}>View URL</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ])
                                }
                            </View>
                            :
                            <ResultsNotFound />
                }
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(210, 36%, 96%)',
    },
    SearchInput: {
        width: '40%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 }
    },
    Picker: {
        width: '40%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'lime',
        shadowOffset: { width: 0, height: 10 }
    },
    Pagination: {
        width: '40%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 10 }
    },
    SearchBtn: {
        flexDirection: 'row',
        backgroundColor: '#c59d5f',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 }
    },
    ReposBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'hsl(210, 36%, 96%)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 }
    },
    Users: {
        flexDirection: 'row',
        backgroundColor: '#c59d5f',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        margin: 10,
        borderRadius: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 10 }
    },
    SearchPicker: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        // borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 }
    },
    UserResultsCount: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'lime',
        shadowOffset: { width: 0, height: 10 }
    },
    InlineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: 15,
    },
    LogoImg: {
        height: 40,
        width: 40,
        borderColor: 'green',
        borderRadius: 75,
        borderWidth: 2,
    },
    ViewURL: {
        fontSize: 20, fontWeight: 'Bold',
    }
});

//make this component available to the app
export default News;
