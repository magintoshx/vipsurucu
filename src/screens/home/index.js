import React, { Component } from "react";
import { ImageBackground, View, StatusBar,Image,AsyncStorage, Alert } from "react-native";
import {  Container, H3, Text, Header, Title, Content, Button, Icon, Body, Left, Right, Item, Input, Form , ListItem, CheckBox, Spinner} from "native-base";
import SplashScreen from 'react-native-splash-screen';
import {NavigationActions, StackActions} from 'react-navigation';

import styles from "./styles";

const logo = require("../../../assets/logo.png");

class Home extends Component {
  static navigationOptions = {
    drawerLockMode: 'locked-closed'
  }
    constructor(props) {
        super(props)
        this.state = {
          hatirla:false, token:null, userid:null,
          telefon:null, sifre:null, loader:true
        };
        getirAnasayfa = this.getirAnasayfa.bind(this);
    }
    getirAnasayfa(){
      this.props.navigation.navigate("Anasayfa");
    }
    componentWillMount() {
       this.getValue();
     }
     async setTokenandId() {
        await AsyncStorage.setItem('token', this.state.token);
        await AsyncStorage.setItem('userid', this.state.userid);
        global.token = this.state.token;
        global.userid = this.state.userid;
        let resetToHome = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Drawer'})],
                        key: null,
                    });
                    this.props.navigation.dispatch(resetToHome);
      }
      async getValue() {
        try {
             const value = await AsyncStorage.getItem('token');
             const uivalue = await AsyncStorage.getItem('userid');
               if (value !== null) {
                 global.token = value;
                 global.userid = uivalue;
					let resetToHome = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Drawer'})],
                        key: null,
                    });
                    this.props.navigation.dispatch(resetToHome);;
               }else{
                 SplashScreen.hide();
               }
               this.setState({loader:false});
            } catch (error) {
              Alert.alert(error);
          }
       }
     oturumuac(){
       var phone = this.state.telefon;
       var password = this.state.sifre;
       if(!phone || !password){
         Alert.alert("Bilgilendirme","Lütfen telefon numaranızı ve şifrenizi giriniz",[
           {text: 'Kapat', onPress: () => null}
         ]);
       }else{
         this.setState({ loader: true});
         fetch(global.apiurl,
               {
                   method: 'POST',
                   headers:
                   {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify(
                   {
                     p : 'nologindriver',
                     s : 1,
                     phone:this.state.telefon,
                     password:this.state.sifre
                   })
               }).then((response) => response.json()).then((jr) =>
               {
                 if(jr["status"] == "1"){
                   this.setState({ token: jr.message.login_token, userid: jr.message.id});
                   this.setTokenandId();
                 }else{
                   Alert.alert("Bilgilendirme",jr.message,[
                     {text: 'Kapat', onPress: () => null}
                   ]);
                 }
                this.setState({ loader : false });
               }).catch((error) =>
               {
                   Alert.alert("Bilgilendirme","Hata Oluştu: "+JSON.stringify(error),[
                     {text: 'Kapat', onPress: () => null}
                   ]);
                   this.setState({ loader : false});
               });
       }
     }

  render() {
    return (
      <Container>
      {
        this.state.loader?
<View style={styles.indicator}>
<Spinner color='green' />
</View>:null
}
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <ImageBackground style={styles.imageContainer}>
          <View style={styles.GenelContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" ></Image>
            <Form style={styles.formlogin}>
              <Item  style={styles.inputitem}>
                <Icon style={styles.loginicons} type="Ionicons" active name="call" />
                <Input placeholder="535*******" maxLength={10} keyboardType="phone-pad" onChangeText={ (text) => this.setState({ telefon: text }) } />
              </Item>
              <Item style={styles.inputitem}>
                <Icon style={styles.loginiconssifre} type="Ionicons" active name="lock" />
                <Input Text="password" secureTextEntry={true} placeholder="**********" onChangeText={ (text) => this.setState({ sifre: text }) } />
              </Item>
            </Form>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.twolayoutiki}>
                <ListItem button style={{height:14,marginLeft:0,paddingTop:10,borderBottomWidth:0}}>
                  <CheckBox style={{backgroundColor: this.state.hatirla?'#F39200':'#E5E8EB',borderColor: '#E6E7EB'}}  checked={this.state.hatirla} onPress={() => this.setState({ hatirla: !this.state.hatirla })} />
                  <Body>
                    <Text>Hatırla</Text>
                  </Body>
                </ListItem>
              </View>
              <View style={styles.twolayout}>
                <H3 style={styles.sifremiunuttum} onPress={()=>this.props.navigation.navigate("sifreunuttum")}>Şifremi Unuttum?</H3>
              </View>
            </View>
            <Button style={styles.girisbtn} onPress={() => this.oturumuac()}>
              <Text style={styles.txt} uppercase={false}>Giriş Yap</Text>
            </Button>
			<Button style={[styles.girisbtn,{backgroundColor:"#000"}]} onPress={()=>this.props.navigation.navigate("basvuru")}>
              <Text style={styles.txt} uppercase={false}>Başvuru</Text>
            </Button>

          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
