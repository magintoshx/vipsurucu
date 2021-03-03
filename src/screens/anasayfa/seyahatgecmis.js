import React, { Component } from "react";
import { ImageBackground, View, StatusBar,Image,TouchableOpacity, Alert,ListView} from "react-native";
import { Container, Header, Title,  Thumbnail,Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body, Badge,  Spinner,List, ListItem} from "native-base";

import styles from "./styles";

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
                s : 4,
                userid:global.userid,
                token:global.token
              })

          }).then((response) => response.json()).then((jr) =>
          {
			  console.log(jr);
            if(jr["status"] == 1){
              this.setState({
                avatar:jr.message.user.avatar?jr.message.user.avatar:"noavatar.png",
                username:jr.message.user.name,
                lasttravels:jr.message.gecmis,
				ciro:jr.ciro
              })
            }else{
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
					  <Text style={{marginBottom:10, textAlign:"center",fontWeight:"bold",color:"#00A0B1"}}>Bugün Kazanılan Toplam Ciro: {this.state.ciro}₺</Text>
        <Text style={styles.pagetitle}>Seyahat Geçmişi</Text>
          <View style={styles.pincswipe}>
          {this.state.lasttravels?
            this.state.lasttravels.map((data) =>{
            return (
              <ListItem
              style={styles.swiperow}
              >

              <View style={styles.swipegecmis}>
                <View style={styles.sgleft}>
                  <Image source={itemgecmisleft}  style={{height:85, marginLeft:13}} resizeMode='contain'/>
                </View>
                <View style={styles.sgcenter}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:18, marginTop:3,alignSelf:'flex-start'}}>{data.fromtext}</Text>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:18, marginTop:30,alignSelf:'flex-start'}}>{data.totext}</Text>
                </View>
                <View style={styles.sgright}>
                  <Text style={{marginBottom:10,alignSelf:'flex-end'}}>{moment(data.created_at).format('L')}</Text>
                  <StarRating
                   disabled={true}
                   maxStars={5}
                   rating={data.star}
                   starSize={17}
                   containerStyle={{width:100}}
                   emptyStarColor={'#CDD0D2'}
                   fullStarColor={'#00a0b1'}
                   style={{marginTop:10,alignSelf:'flex-end'}}
                 />
                 <Text style={{marginTop:10,alignSelf:'flex-end', color:'#CDD0D2'}}>{data.odenen?data.odenen:((data.km) * (data.money)).toFixed(1)}₺{data.status==3?<Text style={{color:'red'}}> - İptal</Text>:null}</Text>
                </View>
              </View>
              </ListItem>)
              })
            :<Text style={styles.hicyok}>Hiç seyahat yok</Text>
        }
          </View>
        </View>
        </Content>
      </Container>
    );
  }
}

export default seyahatgecmis;
