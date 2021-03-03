import React, { Component } from "react";
import { ImageBackground, View, StatusBar,Image,Dimensions,TouchableOpacity,Alert,ListView } from "react-native";
import { Container,Thumbnail, Header, Label, Title, Content, Text, Button, Icon, Left, Right, Body, Badge, Spinner,List, ListItem} from "native-base";

import styles from "./styles";
import pstyle from "./pstyle";
const logo = require("../../../assets/logo.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import StarRating from 'react-native-star-rating';
const itemgecmisleft = require("../../../assets/itemgecmisleft.png");
import moment from 'moment';
require('moment/locale/tr.js');
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from "react-native-modal";

class profil extends Component {
  constructor(props) {
      super(props);
      removeLastTravel = this.removeLastTravel;
      this.state = {
        avatar: null,
        username: null,
        lasttravels:null,
        loader:true,
        starCount: 3,
        puanlaId:null,
        driveravatar:null,
        drivername:null,
        drivercarplate:null,
          diger:"",
          resimmodal:false
      };
      this.gosterresim = null;
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
            if(jr["status"] == 1){
              this.setState({
                avatar:jr.message.user.avatar?jr.message.user.avatar:"noavatar.png",
                username:jr.message.user.name,
                drivercarplate:jr.message.user.car_plate,
                lasttravels:jr.message.gecmis,
                  diger:jr.message.user
              });
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
    acModal(f){
        this.gosterresim = [{
            url: global.sunucu+"app/data/img/"+f,
        }];
        this.setState({
            resimmodal:true
        })
    }
    kapatModal = ()=>{
        this.setState({
            resimmodal:false
        })
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
          <Modal onBackButtonPress={this.kapatModal} visible={this.state.resimmodal} transparent={true} style={{margin:0,padding:0}}>
              <TouchableOpacity onPress={this.kapatModal} style={{position:"absolute",top:20,right:20,zIndex:999}}>
                  <Icon name="close" style={{fontSize:35,color:"#fff"}}/>
              </TouchableOpacity>
              <ImageViewer enableImageZoom enableSwipeDown enablePreload onSwipeDown={this.kapatModal} imageUrls={this.gosterresim}/>
          </Modal>
      <View style={styles.headerview}>
      <Header transparent style={[styles.header, {backgroundColor:'#fff'}]} androidStatusBarColor='#ffffff'>
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
        <Content showsVerticalScrollIndicator={false}>

        <View style={pstyle.pageincontent}>
          <View style={pstyle.pinchead}>
            <Image source={{uri:global.sunucu+"app/data/img/"+this.state.avatar}} style={{ width:80, height:80, borderRadius:80, borderWidth:1, borderColor:'#000', padding:5}} />
            <Label>{this.state.username}</Label>
            <Label>{this.state.drivercarplate}</Label>

           <Button style={{backgroundColor:"#00a0b1", padding:0, margin:0, height:30,alignSelf:'center', marginTop:10}} onPress={()=>{this.props.navigation.navigate("profilduzenle");}}>
            <Text style={{padding:0, margin:0, }}>Profili Düzenle</Text>
           </Button>
          </View>
          <View style={pstyle.pincmenu}>
            <TouchableOpacity style={pstyle.pincmitem} onPress={()=>{this.props.navigation.navigate("destek")}}>
                <Icon name='help-circle-outline' style={pstyle.pincmiicon}/>
                <Text style={pstyle.pincmitext}>Yardım & Destek</Text>
            </TouchableOpacity>
            <TouchableOpacity style={pstyle.pincmitem} onPress={()=>{this.props.navigation.navigate("seyahatgecmis")}}>
                <Icon name='sync' style={pstyle.pincmiicon}/>
                <Text style={pstyle.pincmitext}>Seyahat Geçmişi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={pstyle.pincmitem} onPress={()=>{this.props.navigation.navigate("mesajlar")}}>
                <Icon name='mail' style={pstyle.pincmiicon}/>
                <Text style={pstyle.pincmitext}>Mesajlar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pincswipe}>
              <Text style={styles.pagetitle}>Diğer Bilgiler</Text>
              <View>
                  <View style={styles.listint}>
                      <Text style={styles.listintbaslik}>Araç Tipi:</Text>
                      <Text style={styles.listinticerik}>{this.state.diger.aractip}</Text>
                  </View>
                  <View style={styles.listint}>
                      <Text style={styles.listintbaslik}>Araç Plakası:</Text>
                      <Text style={styles.listinticerik}>{this.state.diger.car_plate}</Text>
                  </View>
                  <View style={styles.listint}>
                      <Text style={styles.listintbaslik}>Araç Modeli:</Text>
                      <Text style={styles.listinticerik}>{this.state.diger.arac_model}</Text>
                  </View>
                  <View style={styles.listint}>
                      <Text style={styles.listintbaslik}>Araç Yılı:</Text>
                      <Text style={styles.listinticerik}>{this.state.diger.arac_yil}</Text>
                  </View>
                  <View style={styles.listint}>
                      <Text style={styles.listintbaslik}>Üyelik Zamanı:</Text>
                      <Text style={styles.listinticerik}>{moment(this.state.diger.created_at).format("L")}</Text>
                  </View>
              </View>
              <Text style={[styles.pagetitle,{marginTop:15}]}>Görseller</Text>
              <View>
                  <View style={styles.listint}>
                      <Text style={styles.listintbaslik}>Kimlik Fotoğrafı:</Text>
                      <TouchableOpacity onPress={()=>this.acModal(this.state.diger.kimlikfoto)}><Image style={{width:42,height:42, borderRadius:21, marginLeft:10}} source={{uri:global.sunucu+"app/data/img/"+this.state.diger.kimlikfoto}}/></TouchableOpacity>
                  </View>
                  <View style={styles.listint}>
                      <Text style={styles.listintbaslik}>Araç Fotoğrafı:</Text>
                      <TouchableOpacity onPress={()=>this.acModal(this.state.diger.aracgorseli)}><Image style={{width:42,height:42, borderRadius:21, marginLeft:10}} source={{uri:global.sunucu+"app/data/img/"+this.state.diger.aracgorseli}}/></TouchableOpacity>
                  </View>
                  <View style={styles.listint}>
                      <Text style={styles.listintbaslik}>Belediye Ruhsatı:</Text>
                      <TouchableOpacity onPress={()=>this.acModal(this.state.diger.ruhsat)}><Image style={{width:42,height:42, borderRadius:21, marginLeft:10}} source={{uri:global.sunucu+"app/data/img/"+this.state.diger.ruhsat}}/></TouchableOpacity>
                  </View>
              </View>
              {/*this.state.lasttravels?
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
                   fullStarColor={'#FFB900'}
                   style={{marginTop:10,alignSelf:'flex-end'}}
                 />
                 <Text style={{marginTop:10,alignSelf:'flex-end', color:'#CDD0D2'}}>{((data.km) * (data.money)).toFixed(1)}₺{data.status==3?<Text style={{color:'red'}}> - İptal</Text>:null}</Text>
                </View>
              </View>
              </ListItem>)
              })
            :<Text style={styles.hicyok}>Hiç seyahat yok</Text>
        */}
          </View>
        </View>
        </Content>
      </Container>
    );
  }
}

export default profil;
