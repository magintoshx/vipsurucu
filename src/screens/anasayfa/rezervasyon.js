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
        lasttravels:null,
        loader:true,
        starCount: 3,
        puanlaId:null,
        driveravatar:null,
        drivername:null,
        drivercarplate:null,
		    ciro:0
      };
    }

  componentWillMount(){
    this.konumumual();
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
                p : 'startdriver',
                s : 22,
                userid:global.userid,
                token:global.token
              })

          }).then((response) => response.json()).then((jr) =>
          {
            if(jr["status"] == 1)
            {
              this.setState({
                lasttravels:jr.message.rezervasyon,
              })
            }
            else
            {
              Alert.alert("Bilgilendirme",jr.message,[
                {text: 'Kapat', onPress: () => null}
              ]);
            }
            this.setState({ loader : false});
          }).catch((error) =>
          {
              Alert.alert("Bilgilendirme","Hata Oluştu: "+JSON.stringify(error),[
                {text: 'Kapat', onPress: () => null}
              ]);
              this.setState({ loader : false});
          });
  }
  konumumual(){
   try{
      Geolocation.getCurrentPosition(
        (position) => {
			  this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          },()=>this.getMyApp());
        },
        (error) => {this.setState({ error: error.message });
        Alert.alert("Bilgilendirme","Konum bilginiz alınırken hata oluştu. Lütfen konum verilerinizi kontrol ediniz.",[
          {text: 'Tekrar Dene', onPress: () => {
            this.konumumual();
          }},
        ],{ cancelable: false });
      },
        { enableHighAccuracy: false},
      );
    }catch(e){
      console.log(e);
    }
  }
  tekrarcek(){
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
                p : 'startdriver',
                s : 22,
                userid:global.userid,
                token:global.token
              })

          }).then((response) => response.json()).then((jr) =>
          {
            if(jr["status"] == 1)
            {
              this.setState({
                lasttravels:jr.message.rezervasyon,
              })
            }
            else
            {
              Alert.alert("Bilgilendirme",jr.message,[
                {text: 'Kapat', onPress: () => null}
              ]);
            }
            this.setState({ loader : false});
          }).catch((error) =>
          {
              Alert.alert("Bilgilendirme","Hata Oluştu: "+JSON.stringify(error),[
                {text: 'Kapat', onPress: () => null}
              ]);
              this.setState({ loader : false});
          });
  }
  rezervasyonOnayla(id)
  {
    Alert.alert("Bilgilendirme","Bu rezervasyonu almak istiyor musunuz?",[
      {text: 'Evet', onPress: () => {
        fetch(global.apiurl,
        {
          method: 'POST',
          headers:{'Accept': 'application/json','Content-Type': 'application/json',},
          body: JSON.stringify(
          {
            p : 'startdriver',
            s : 23,
            userid:global.userid,
            token:global.token,
            id:id
          })
          }).then((response) => response.json()).then((jr) =>
          {
            if(jr["status"] == 1)
            {
              Alert.alert("Bilgilendirme","Rezervasyon başarıyla alındı.",[
              {text: 'Tamam', onPress: () => {this.tekrarcek()}},
              ]);
              this.setState({ loader : false});
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
      }},
      {text: 'İptal', onPress: () => {

      }}
    ]);
  }
  rezervasyonAlindi(){
    Alert.alert("Bilgilendirme","Bu rezervasyon başka bir şofor tarafından alınmıştır!",[
      {text: 'Kapat', onPress: () => null}
    ]);
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
          <Text style={styles.pagetitle}>Rezervasyonlar</Text>
          {this.state.lasttravels?this.state.lasttravels.map((data) =>{
            return (
              <View style={{width: deviceWidth-30,marginHorizontal: 15,marginBottom: 15,borderBottomWidth: 2,borderColor: "#F39200",paddingBottom: 15}}>
                <View style={{width: deviceWidth-30,marginBottom: 10}}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:16,alignSelf:'flex-start'}}>{data.fromtext}</Text>
                </View>
                <View style={{width: deviceWidth-30,marginBottom: 10}}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:16,alignSelf:'flex-start'}}>{data.totext}</Text>
                </View>
                <View style={{width: deviceWidth-30,marginBottom: 10}}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:16,alignSelf:'flex-start'}}><Text style={{color:'#000',fontWeight: 'bold'}}>Not : </Text>{data.description?data.description:"Yok"}</Text>
                </View>
                <View style={{width: deviceWidth-30,flexDirection: 'row'}}>
                  <View style={{width:135,justifyContent: 'center'}}>
                    <Text>{data.rez_tarih} - {data.rez_saat}</Text>
                  </View>
                  <View style={{width:60,alignItems: 'center',justifyContent: 'center'}}>
                    <Text style={{color:'#000',fontWeight: 'bold'}}>{data.odenen?data.odenen:((data.km) * (data.money)).toFixed(1)}₺</Text>
                  </View>
                  <View style={{width: deviceWidth-225,alignItems: 'flex-end'}}>
                    {
                      data.driver_id==0?<TouchableOpacity onPress={() => this.rezervasyonOnayla(data.id)} style={{backgroundColor: "#F39200",padding: 10,borderRadius: 10}}>
                        <Text style={{color:"#FFF"}}>Onayla</Text>
                      </TouchableOpacity>:null
                    }
                    {
                      data.driver_id!=0 && data.driver_id!=global.userid?<TouchableOpacity onPress={() => this.rezervasyonAlindi()} style={{backgroundColor: "red",padding: 10,borderRadius: 10}}>
                        <Text style={{color:"#FFF"}}>Alındı</Text>
                      </TouchableOpacity>:null
                    }
                    {
                      data.driver_id==global.userid?<View style={{flexDirection: 'row'}}><TouchableOpacity style={{backgroundColor: "green",marginRight: 5,padding: 10,borderRadius: 10}}>
                        <Text style={{color:"#FFF"}}>Onaylandı</Text>
                      </TouchableOpacity><TouchableOpacity  onPress={() => this.props.navigation.navigate("rezervasyondetay",{id:data.id})} style={{backgroundColor: "#40a8c4",padding: 10,borderRadius: 10}}>
                        <Text style={{color:"#FFF"}}>Detay</Text>
                      </TouchableOpacity></View>:null
                    }
                  </View>
                </View>
              </View>)
            }):<Text style={styles.hicyok}>Hiç rezervasyon yok</Text>
          }
        </View>
      </Content>
    </Container>
    );
  }
}

export default seyahatgecmis;
