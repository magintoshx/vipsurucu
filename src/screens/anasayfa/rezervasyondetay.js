import React, { Component } from "react";
import { ImageBackground, View, StatusBar,Image,TouchableOpacity, Alert,ListView,Linking,Dimensions} from "react-native";
import { Container, Header, Title,  Thumbnail,Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body, Badge,  Spinner,List, ListItem} from "native-base";

import styles from "./styles";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../assets/logo.png");
const itemgecmisleft = require("../../../assets/itemgecmisleft.png");
import StarRating from 'react-native-star-rating';
import moment from 'moment';

require('moment/locale/tr.js');
class seyahatgecmis extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loader:true,
        nereden:"",
        nereye:"",
        tarih:"",
        name:"",
        phone:"",
        fromlat:"",
        fromlng:"",
        tolat:"",
        tolng:"",
        tarih:"",
        saat:"",
        description:""
      };
    }

  componentWillMount(){
    fetch(global.apiurl,
    {
      method: 'POST',
      headers:{'Accept': 'application/json','Content-Type': 'application/json',},
      body: JSON.stringify(
      {
        p : 'startdriver',
        s : 24,
        userid:global.userid,
        id:this.props.navigation.getParam("id"),
        token:global.token
      })
      }).then((response) => response.json()).then((jr) =>
      {
        if(jr["status"] == 1)
        {
          console.log(jr);
          this.setState({
            nereden:jr.message.rezervasyon.fromtext,
            nereye:jr.message.rezervasyon.totext,
            name:jr.message.rezervasyon.name,
            phone:jr.message.rezervasyon.phone,
            fromlat:jr.message.rezervasyon.fromlat,
            fromlng:jr.message.rezervasyon.fromlng,
            tolat:jr.message.rezervasyon.tolat,
            tolng:jr.message.rezervasyon.tolng,
            tarih:jr.message.rezervasyon.rez_tarih,
            saat:jr.message.rezervasyon.rez_saat,
            description:jr.message.rezervasyon.description,
            loader : false
          });
        }
        else
        {
          Alert.alert("Bilgilendirme",jr.message,[{text: 'Kapat', onPress: () => null}]);
          this.setState({ loader : false});
        }
      }).catch((error) =>
      {
        Alert.alert("Bilgilendirme","Hata Oluştu: "+JSON.stringify(error),[{text: 'Kapat', onPress: () => null}]);
        this.setState({ loader : false});
      });
  }
  yonlendiralinacak(lat,lng){
    Linking.openURL('google.navigation:q='+this.state.fromlat+'+'+this.state.fromlng);
  }
  yonlendirgidilecek(lat,lng){
    Linking.openURL('google.navigation:q='+this.state.tolat+'+'+this.state.tolng);
  }
  render() {
    return (
      <Container style={styles.anasayfaGenel, {backgroundColor:'#fff'}}>
      {
        this.state.loader?
        <View style={styles.indicator}>
        <Spinner color='green' />
        </View>:null
      }
      <View style={styles.headerview}>
      <Header transparent style={styles.header, {backgroundColor:'#fff'}} androidStatusBarColor='#ffffff'>
        <Left style={{ flex: 1 }}>
          <Button style={styles.headeringeribtn} transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.headeringeriicon} name="arrow-back" />
          </Button>
        </Left>
        <Body style={styles.logoOrtala}>
          <Image source={logo} style={styles.logo} resizeMode="contain" ></Image>
        </Body>
        <Right style={{marginTop:-10}}>
        </Right>
      </Header>
      </View>
      <Content>
        <View style={{marginTop:110}}>
          <Text style={styles.pagetitle}>Detay</Text>
          <View style={{marginHorizontal: 15,width:deviceWidth-30 }}>
            <Text style={{fontSize:16,fontWeight: 'bold',marginBottom: 10,borderBottomWidth: 1,borderColor: "#aaa",paddingBottom: 10}}>Nereden : <Text style={{fontSize:16,fontWeight: '100'}}>{this.state.nereden}</Text></Text>
            <Text style={{fontSize:16,fontWeight: 'bold',marginBottom: 10,borderBottomWidth: 1,borderColor: "#aaa",paddingBottom: 10}}>Nereye : <Text style={{fontSize:16,fontWeight: '100'}}>{this.state.nereye}</Text></Text>
            <Text style={{fontSize:16,fontWeight: 'bold',marginBottom: 10,borderBottomWidth: 1,borderColor: "#aaa",paddingBottom: 10}}>Müşteri : <Text style={{fontSize:16,fontWeight: '100'}}>{this.state.name}</Text></Text>
            <Text style={{fontSize:16,fontWeight: 'bold',marginBottom: 10,borderBottomWidth: 1,borderColor: "#aaa",paddingBottom: 10}}>Telefon : <Text style={{fontSize:16,fontWeight: '100'}}>{this.state.phone}</Text></Text>
            <Text style={{fontSize:16,fontWeight: 'bold',marginBottom: 10,borderBottomWidth: 1,borderColor: "#aaa",paddingBottom: 10}}>Tarih : <Text style={{fontSize:16,fontWeight: '100'}}>{this.state.tarih}</Text></Text>
            <Text style={{fontSize:16,fontWeight: 'bold',marginBottom: 10,borderBottomWidth: 1,borderColor: "#aaa",paddingBottom: 10}}>Saat : <Text style={{fontSize:16,fontWeight: '100'}}>{this.state.saat}</Text></Text>
            <Text style={{fontSize:16,fontWeight: 'bold',marginBottom: 10,borderBottomWidth: 1,borderColor: "#aaa",paddingBottom: 10}}>Not : <Text style={{fontSize:16,fontWeight: '100'}}>{this.state.description}</Text></Text>
            <View style={{width: deviceWidth-30,flexDirection: 'row',marginTop: 15}}>
              <View style={{width: deviceWidth/2-15,justifyContent: 'center',alignItems: 'flex-start'}}>
                <TouchableOpacity onPress={() => this.yonlendiralinacak()} style={{width: deviceWidth/2-30,textAlign: 'center',alignItems: 'center',backgroundColor: "blue",padding: 10,borderRadius: 10}}>
                  <Text style={{color:"#FFF"}}>Alınacak Yer</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: deviceWidth/2-15,alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => this.yonlendirgidilecek()} style={{width: deviceWidth/2-30,textAlign: 'center',alignItems: 'center',backgroundColor: "#a0522d",padding: 10,borderRadius: 10}}>
                  <Text style={{color:"#FFF"}}>Gidilecek Yer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Content>
    </Container>
    );
  }
}

export default seyahatgecmis;
