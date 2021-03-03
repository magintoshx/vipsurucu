import React, { Component } from "react";
import { ImageBackground, View, StatusBar,Image,Dimensions,StyleSheet,AppRegistry,ActivityIndicator,
TouchableOpacity, ScrollView, Alert,AsyncStorage, BackHandler,Linking,Platform
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS,request} from 'react-native-permissions';

import MapViewDirections from 'react-native-maps-directions';
import MapView, { PROVIDER_GOOGLE, Marker }  from 'react-native-maps';
import {NavigationActions, StackActions} from 'react-navigation';

import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Toast, Input, Item,Badge, Spinner,
 Tab, Tabs,TabHeading,Card, CardItem,ActionSheet
} from "native-base";
import styles from "./styles";
import styless from "./styless";
import StarRating from 'react-native-star-rating';
import SplashScreen from 'react-native-splash-screen';
import call from 'react-native-phone-call'

const logo = require("../../../assets/logo.png");
const headeroverlay = require("../../../assets/headeroverlay.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const haritapoiicon="";
import GPSState from 'react-native-gps-state';
import moment from 'moment';
require('moment/locale/tr.js');
import Modal from "react-native-modal";
import OneSignal from 'react-native-onesignal';
import SoundPlayer from 'react-native-sound-player';
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>İnternet bağlantınızda sorun var. Lütfen konrol edin.</Text>
    </View>
  );
}

class Anasayfa extends Component {

  konumumual(){
   try{
      Geolocation.getCurrentPosition(
        (position) => {
            /*this._startTimer = setInterval(() => {
                this.konumumual();
            }, 5000);*/
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


  driverCall = () => {
    const args = {
        number: this.state.phonenumber,
        prompt: false
    }
    call(args).catch(console.error);
  }
mesajGonder(id){
  this.setState({ loader : true});
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
              p : 'messagedriver',
              s : 5,
              userid:global.userid,
              token:global.token,
              id:id
            })
        }).then((response) => response.json()).then((jr) =>
        {
          if(jr["status"] == 1){
            global.chatid = jr.message;
            this.props.navigation.navigate("mesajlas");
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
  constructor(props) {
      super(props);
	     OneSignal.init("e3c03bbf-cfa0-4666-af9f-d4d93b65aa1a", {kOSSettingsKeyAutoPrompt : true});
		   OneSignal.addEventListener('ids', this.onIds.bind(this));
		   OneSignal.inFocusDisplaying(0);
		   OneSignal.configure({});
      messageSend = this.messageSend;
      this.handleBackPress = this.handleBackPress.bind(this);
      this.basvurmusMenu = this.basvurmusMenu.bind(this);
      this.state = {
        latitude: null,
        longitude: null,
        error: null,
        loader: true,
        seyehatlistesi:null,
        phonenumber:null,
        isConnected: true,
          listeModal:false,
        waitlist:null,
        applylist:null,
          durumum:false,
		  modalOfUcret:false,
          latdelta:0,
		  bunuGoster:null,
		  girilenUcret:"",
          lngdelta:(deviceWidth / deviceHeight) * 0.01522
      };
      this.bolunecek = 0.01522;
	  this.travelId  = 0;
    }
    async oturumkapanmis(){
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userid');

	  let resetToHome = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Home'})],
                        key: null,
                    });
                    this.props.navigation.dispatch(resetToHome);

    }
    getMyApp(){
		console.log("getMyApp");
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
                      s : 3,
                      userid:global.userid,
                      token:global.token,
                      mylat:this.state.latitude,
                      mylng:this.state.longitude
                    })

                }).then((response) => response.json()).then((jr) =>
                {
                  console.log(jr);
                  if(jr["status"] == 1){
                    global.bildirim = jr.message.bildirimSayi;
                    if(jr.message.applylist && jr.message.applylist.length>0){
                        if(this.state.applylist!==jr.message.applylist){
                            this.setState({
                                applylist:jr.message.applylist?jr.message.applylist:null,
                                durumum:jr.durum,
                                loader:false,
                                listeModal:false
                            });
                        }

                    }else{
                        this.setState({
                            waitlist:jr.message.waitlist?jr.message.waitlist:null,
                            applylist:null,
                            durumum:jr.durum,
                            loader:false
                        });
						if(!jr.message.waitlist){
							this.setState({
								bunuGoster:null
							});
						}
						else if(!this.state.bunuGoster && jr.message.waitlist){
							this.setState({
								bunuGoster:jr.message.waitlist[0]
							});
							try {
								SoundPlayer.playSoundFile('uyari', 'wav')
							} catch (e) {
								console.log("cannot play the sound file", e)
							}

						}else if(jr.message.waitlist && jr.message.waitlist.length>0 && jr.message.waitlist[0].id != this.state.bunuGoster.id){
							this.setState({
								bunuGoster:jr.message.waitlist[0]
							});
							try {
								SoundPlayer.playSoundFile('uyari', 'wav')
							} catch (e) {
								console.log("cannot play the sound file", e)
							}

						}
                    }
                      SplashScreen.hide();
                      //BackHandler.addEventListener('hardwareBackPress',this.handleBackPress);

                  }else{
                    this.oturumkapanmis();
                  }
                }).catch((error) =>
                {
                    console.log(error);
                });
    }
    componentDidMount(){
        this.unsubscribe = NetInfo.addEventListener(state => {
			 this.handleConnectivityChange(state.isConnected);
        });
    }
	locationSetting(){
		this.sendPerm();
	}
		sendPerm = () =>{
		request(
		  Platform.select({
			android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
			ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
		  })
		).then(sonuc =>{
			if(sonuc=="blocked"){
				 Alert.alert("Bilgilendirme","Uygulamayı konum izni olmadan kullanamazsınız. İzin vermek istiyor musunuz?",[
                      {text: 'Evet', onPress: () => GPSState.openSettings()},
                      {text: 'İptal', onPress: () => BackHandler.exitApp()}
                    ]);
			}
			else if(sonuc != "granted"){
				 Alert.alert("Bilgilendirme","Konum izni olmadan uygulamayı kullanamazsınız. Konum izni vermek istiyor musunuz?",[
                      {text: 'Evet', onPress: () => this.sendPerm()},
                      {text: 'İptal', onPress: () => BackHandler.exitApp()}
                    ]);
			}else{



				try{
			Geolocation.getCurrentPosition(
			  (position) => {
				this.setState({
				  latitude: position.coords.latitude,
				  longitude: position.coords.longitude,
				  error: null,
				  loader:false
				});
					  this.mylat = position.coords.latitude;
							  this.mylng = position.coords.longitude;
				this._startTimer = setInterval(() => {
				  this.konumumual();
				}, 10000);
				this.konumumual();
			  },
			  (error) => {
				   console.log(error);
				  if(error.code == 5){
					  	  BackHandler.exitApp();
				  }else if(error.code == 3){
					  this.konumumual();
				  }


			},
			  { enableHighAccuracy: true},
			);
		  }catch(e){
			console.log(e);
		  }



			}
		});
	}

    componentWillMount() {
		   this.locationSetting();

  }


       onIds(device) {
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
                                      s : 21,
                                      userid:global.userid,
                                      token:global.token,
                                      onekey:device.userId
                                  })
                          }).then((response) => response.json()).then((jr) =>
                      {

                      }).catch((error) =>
                      {

                      });


     }


  handleBackPress(){
    this.props.navigation.goBack()
  }

 handleConnectivityChange = isConnected => {
      if (isConnected) {
        this.setState({ isConnected });
      } else {
        this.setState({ isConnected });
      }
    };
  componentWillUnmount(){
	this.unsubscribe();
    try{clearInterval(this._startTimer);}catch(e){console.log(e);}
    try{GPSState.removeListener();}catch(e){console.log(e);}
    try{BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)}catch(e){console.log(e);}
    try{OneSignal.removeEventListener('ids', this.onIds);}catch(e){console.log(e);}
  }
  haritadaGoster(travelid){
    this.setState({ loader : true});
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
                s : 15,
                userid:global.userid,
                token:global.token,
                id:travelid
              })
          }).then((response) => response.json()).then((jr) =>
          {
            if(jr["status"] == 1){
              if(Platform.OS=="ios"){
                Linking.openURL('maps://app?saddr='+this.state.latitude+'+'+this.state.longitude+'&daddr='+jr.message.fromlat+'+'+jr.message.fromlng);
              }else{
                Linking.openURL('google.navigation:q='+jr.message.fromlat+'+'+jr.message.fromlng);
              }
            }else{
              Alert.alert("Bilgilendirme",jr.message,[
                {text: 'Kapat', onPress: () => null}
              ]);
            }
            this.setState({ loader : false});
          }).catch((error) =>
          {
              Alert.alert("Bilgilendirme","Yönlendirilme yapılamadı. Lütfen daha sonra tekrar dene.",[
                {text: 'Kapat', onPress: () => null}
              ]);
              this.setState({ loader : false});
          });
  }
    haritadaGoster2(travelid){
    this.setState({ loader : true});
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
                s : 15,
                userid:global.userid,
                token:global.token,
                id:travelid
              })
          }).then((response) => response.json()).then((jr) =>
          {
            if(jr["status"] == 1){
              if(Platform.OS=="ios"){
                Linking.openURL('maps://app?saddr='+this.state.latitude+'+'+this.state.longitude+'&daddr='+jr.message.tolat+'+'+jr.message.tolng);
              }else{
                Linking.openURL('google.navigation:q='+jr.message.tolat+'+'+jr.message.tolng);
              }
            }else{
              Alert.alert("Bilgilendirme",jr.message,[
                {text: 'Kapat', onPress: () => null}
              ]);
            }
            this.setState({ loader : false});
          }).catch((error) =>
          {
              Alert.alert("Bilgilendirme","Yönlendirilme yapılamadı. Lütfen daha sonra tekrar dene.",[
                {text: 'Kapat', onPress: () => null}
              ]);
              this.setState({ loader : false});
          });
  }
  cagriKabul(travelid){
    Alert.alert("Bilgilendirme","Bu transfer işini kabul etmek istiyor musunuz?",[
      {text: 'Evet', onPress: () => {
        this.setState({ loader : true});
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
                    s : 16,
                    userid:global.userid,
                    token:global.token,
                    id:travelid
                  })
              }).then((response) => response.json()).then((jr) =>
              {
                if(jr["status"] == 1){
                  this.getMyApp();
                }
                  Alert.alert("Bilgilendirme",jr.message,[
                    {text: 'Kapat', onPress: () => null}
                  ]);
                this.setState({ loader : false});
              }).catch((error) =>
              {
                  Alert.alert("Bilgilendirme","Tranfer kabul edilemedi. Lütfen daha sonra tekrar dene.",[
                    {text: 'Kapat', onPress: () => null}
                  ]);
                  this.setState({ loader : false});
              });
      }},
      {text: 'Hayır', onPress: () => null},
    ]);
  }
  cagriIptal(travelid){
    Alert.alert("Bilgilendirme","Bu çağrıyı iptal etmek istiyor musunuz?",[
      {text: 'Evet', onPress: () => {
        this.setState({ loader : true});
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
                    s : 20,
                    userid:global.userid,
                    token:global.token,
                    id:travelid
                  })
              }).then((response) => response.json()).then((jr) =>
              {
                if(jr["status"] == 1){
                  this.getMyApp();
                }else{
                    Alert.alert("Bilgilendirme",jr.message,[
                        {text: 'Kapat', onPress: () => null}
                    ]);
                }
              }).catch((error) =>
              {
                  Alert.alert("Bilgilendirme","Çağrı iptals edilemedi. Lütfen daha sonra tekrar dene.",[
                    {text: 'Kapat', onPress: () => null}
                  ]);
                  this.setState({ loader : false});
              });
      }},
      {text: 'Hayır', onPress: () => null},
    ]);
  }
  cagriBaskasi(travelid){
    Alert.alert("Bilgilendirme","Bu transferin başkaları tarafından yapılmasını istiyor musunuz?",[
      {text: 'Evet', onPress: () => {
        this.setState({ loader : true});
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
                    s : 17,
                    userid:global.userid,
                    token:global.token,
                    id:travelid
                  })
              }).then((response) => response.json()).then((jr) =>
              {
                if(jr["status"] == 1){
                  this.getMyApp();
                }
                  Alert.alert("Bilgilendirme",jr.message,[
                    {text: 'Kapat', onPress: () => null}
                  ]);
                this.setState({ loader : false});
              }).catch((error) =>
              {
                  Alert.alert("Bilgilendirme","Tranfer işlemi gerçekleştirilemedi. Lütfen daha sonra tekrar dene.",[
                    {text: 'Kapat', onPress: () => null}
                  ]);
                  this.setState({ loader : false});
              });
      }},
      {text: 'Hayır', onPress: () => null},
    ]);
  }
  cagriYapildi(travelid){
	  this.travelId = travelid;
	  this.setState({
		  modalOfUcret:true
	  });
  }
basvuracakActions(y,id){
    if(y == 0){
        this.mesajGonder(id);
    }else if(y == 1){
        this.haritadaGoster(id);
    }else if(y == 2){
        this.cagriKabul(id);
    }else if(y == 3){
        this.cagriIptal(id);
    }
}
  basvuracakMenu(id){
            ActionSheet.show(
              {
                options: [
                  { text: "Mesaj Gönder", icon: "chatboxes", iconColor: "#9444A5" },
                  { text: "Haritada göster", icon: "locate", iconColor: "#9444A5" },
                  { text: "Transferi kabul et", icon: "checkmark-circle", iconColor: "#9444A5" },
                  { text: "Kapat", icon: "close-circle", iconColor: "#9444A5" },
                ],
                cancelButtonIndex: 3,
                title: "Transfer işlemleri"
              },
              buttonIndex => {
                if(buttonIndex == 0){
                  this.mesajGonder(id);
                }else if(buttonIndex == 1){
                  this.haritadaGoster(id);
                }else if(buttonIndex == 2){
                  this.cagriKabul(id);
                }
              }
        );
  }
  iconActions(t){
      id = this.state.applylist[0].id;
      if(t == 0){
          this.mesajGonder(id);
      }else if(t == 1){
          this.haritadaGoster(id);
      }else if(t == 2){
          this.cagriYapildi(id);
      }else if(t == 3){
          this.cagriBaskasi(id);
      }else if(t == 4){
          this.haritadaGoster2(id);
      }
  }
  basvurmusMenu(id){
    ActionSheet.show(
      {
        options: [
          { text: "Mesaj Gönder", icon: "chatboxes", iconColor: "#9444A5" },
          { text: "Haritada göster", icon: "locate", iconColor: "#9444A5" },
          { text: "Transfer başarıyla yapıldı", icon: "checkmark-circle", iconColor: "#9444A5" },
          { text: "Transfere başkası başvursun", icon: "refresh", iconColor: "#9444A5" },
          { text: "Kapat", icon: "close-circle", iconColor: "#9444A5" },
        ],
        cancelButtonIndex: 4,
        title: "Transfer işlemleri"
      },
      buttonIndex => {
        if(buttonIndex == 0){
          this.mesajGonder(id);
        }else if(buttonIndex == 1){
          this.haritadaGoster(id);
        }else if(buttonIndex == 2){
          this.cagriYapildi(id);
        }else if(buttonIndex == 3){
          this.cagriBaskasi(id);
        }
      }
);
  }

    acilDurum(){

        Alert.alert(
            'VipUpp',
            'Acil durum çağrısı yollamak istediğinize emin misiniz ? ',
            [
                {text: 'Hayır', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                {text: 'Evet', onPress: () => this.acildurumcagrigonder()},
            ]
        );
    }
    acildurumcagrigonder(){
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
                        p : 'start',
                        s : 18,
                        userid:global.userid,
                        token:global.token,
						tip:1
                    })

            }).then((response) => response.json()).then((jr) =>
        {
            Alert.alert("Bilgilendirme","Acil durum çağrısı başarıyla gönderilmiştir.",[
                {text: 'Kapat', onPress: () => null}
            ]);

        }).catch((error) =>
        {
            Alert.alert("Bilgilendirme","Hata Oluştu: "+JSON.stringify(error),[
                {text: 'Kapat', onPress: () => null}
            ]);
            this.setState({ loader : false});
        });
    }
    zoomArtir = ()=>{
      this.bolunecek=this.bolunecek*0.7;
       let region = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta:this.state.latdelta,
            longitudeDelta:parseFloat((deviceWidth / deviceHeight) * this.bolunecek)
        };
        this._map.animateToRegion(region, 100);
    };
    zoomAzalt = ()=>{
        this.bolunecek=this.bolunecek*1.3;
        let region = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta:this.state.latdelta,
            longitudeDelta:parseFloat((deviceWidth / deviceHeight) * this.bolunecek)
        };
        this._map.animateToRegion(region, 100);
    }
    durumDegis(durum){
      this.setState({
          loader:true
      });
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
                        s : 19,
                        userid:global.userid,
                        token:global.token,
                        durum:durum
                    })
            }).then((response) => response.json()).then((jr) =>
        {
            if(jr["status"] == 1){
                this.getMyApp();
            }else{
                Alert.alert("Bilgilendirme",jr.message,[
                    {text: 'Kapat', onPress: () => this.setState({ loader : false})}
                ]);
            }

        }).catch((error) =>
        {
        console.log(error);
            this.setState({ loader : false});
        });
    }
    cagriGor(){
        this.setState({
            listeModal:true
        })
    }
    modalClose = () => {
        this.setState({
                listeModal:false
            }
        )
    }
	modalCloseUcret = () => {
        this.setState({
                modalOfUcret:false
            }
        )
    }
	girilenUcret(ucret){
		this.setState({
			girilenUcret:ucret
		})
	}
	seyahatTamamla(){
    this.setState({ loader : true});
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
          s : 18,
          userid:global.userid,
          token:global.token,
          id:this.travelId,
          })
        }).then((response) => response.json()).then((jr) =>
        {
        if(jr["status"] == 1){
          this.getMyApp();
        }
          Alert.alert("Bilgilendirme",jr.message,[
          {text: 'Kapat', onPress: () => {
            this.setState({ loader : false, modalOfUcret:false});
          }}
          ]);
        }).catch((error) =>
        {
          Alert.alert("Bilgilendirme","Tranfer işlemi gerçekleştirilemedi. Lütfen daha sonra tekrar dene.",[
          {text: 'Kapat', onPress: () => null}
          ]);
          this.setState({ loader : false});
        });
	}
  render() {
    return (
      <Container style={styles.anasayfaGenel}>
      {
      this.state.loader?
        <View style={styles.indicator}>
        <Spinner color='green' />
        </View>:null
      }
      {
        !this.state.isConnected?<MiniOfflineSign />:null
      }

	  <Modal
              onBackdropPress={this.modalCloseUcret}
              onBackButtonPress={this.modalCloseUcret}
              animationType="slide"
              transparent={true}
              visible={this.state.modalOfUcret}
              onRequestClose={this.modalCloseUcret}>
              <View style={{backgroundColor:"#00A0B1",borderRadius:20,padding:15}}>
			             <Text style={{textAlign:"center",marginBottom:5,color:"#ffffff"}}>Transferi tamamlamak istediğinize emin misiniz ?</Text>
		              <Button onPress={()=>this.seyahatTamamla()} style={{alignItems:"center",marginTop:15,justifyContent:"center",alignSelf:"center",backgroundColor:"green",height:55,borderRadius:55/2}}><Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="check"/><Text>Seyahati Tamamla</Text></Button>

              </View>
          </Modal>

          <Modal
              onBackdropPress={this.modalClose}
              onBackButtonPress={this.modalClose}
              animationType="slide"
              transparent={true}
              visible={this.state.listeModal}
              onRequestClose={this.modalClose}>
              <View style={{flex:1,backgroundColor:"#00A0B1",borderRadius:20,padding:15}}>
                  {this.state.bunuGoster? <ScrollView style={{height:deviceHeight-75}}>
                                      <View>
                                          <Text style={{fontWeight:'bold'}}>Nereden: </Text>
                                          <Text style={{color:"#fff"}}>{this.state.bunuGoster.fromtext}</Text>
                                          <Text style={{fontWeight:'bold'}}>Nereye: </Text>
                                          <Text style={{color:"#fff"}}>{this.state.bunuGoster.totext}</Text>
                                          <Text style={{fontWeight:'bold'}}>Mesafe: </Text>
                                          <Text style={{color:"#fff"}}>{this.state.bunuGoster.km} KM</Text>
                                          <Text style={{fontWeight:'bold'}}>Toplam Ücret: </Text>
                                          <Text style={{color:"#fff"}}>{(this.state.bunuGoster.km * this.state.bunuGoster.money).toFixed(1)}₺</Text>
                                          <Text style={{fontWeight:'bold'}}>Zaman: </Text>
                                          <Text style={{color:"#fff"}}>{moment(this.state.bunuGoster.created_at).format("L LT")}</Text>
                                      </View>
                                  <View style={{zIndex:99}}>
                                      <View style={{padding:15,justifyContent:"center",alignItems:"center"}}>
                                          <Button onPress={()=>this.basvuracakActions(2,this.state.bunuGoster.id)} style={{alignItems:"center",marginBottom:7,justifyContent:"center",alignSelf:"center",backgroundColor:"green",height:55,borderRadius:55/2}}><Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="check"/><Text>Kabul Et</Text></Button>
                                          <Button onPress={()=>this.basvuracakActions(3,this.state.bunuGoster.id)} style={{alignItems:"center",marginBottom:7,justifyContent:"center",alignSelf:"center",backgroundColor:"red",height:55,borderRadius:55/2}}><Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="close"/><Text>Reddet</Text></Button>
                                          <Button onPress={()=>this.basvuracakActions(1,this.state.bunuGoster.id)} style={{alignItems:"center",marginBottom:7,justifyContent:"center",alignSelf:"center",backgroundColor:"blue",height:55,borderRadius:55/2,marginLeft:7}}><Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="map"/><Text>Haritada Göster</Text></Button>
                                      </View>
                                  </View>
                              </ScrollView>
                      :<Text style={{marginTop:15, textAlign:'center'}}>Hiç bekleyen transfer bulunamadı. Yeni transfer isteği gelmesi durumunda bu alanda otomatik gözükecektir</Text>
                  }
              </View>
          </Modal>
      <View style={styles.headerview}>
      <Image
        style={{width:deviceWidth, height: '100%', position: 'absolute', top: 0, left: 0}}
        source={headeroverlay}
        resizeMode='stretch'
      />
        <Header transparent style={styles.header} androidStatusBarColor='#ffffff'>
          <Left style={{ flex: 1 }}>
            <Button style={styles.headeringeribtn} transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={styles.headeringeriicon} name="menu" />
            </Button>
          </Left>
          <Body style={styles.logoOrtala}>
            <Image source={logo} style={styles.logo} resizeMode="contain" ></Image>
          </Body>
          <Right style={{marginTop:-10}}>
              <TouchableOpacity onPress={()=>{this.acilDurum()}}>
                  <Icon style={styles.headerinalarmicon} type="FontAwesome" name="exclamation-triangle" />
              </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("bildirim");}}>
          {
            global.bildirim && global.bildirim != 0?
            <Badge style={{ position:'absolute', right:0, zIndex:9999,  top:3, opacity:1, backgroundColor:'#6cbd45', zIndex:99999, justifyContent: 'center' }}>
              <Text>{global.bildirim}</Text>
            </Badge>:null
          }
              <Icon style={styles.headerinbildirimicon} type="FontAwesome" name='bell-o' />
           </TouchableOpacity>
          </Right>
        </Header>
        </View>
  {!this.state.loader?
        <Content>
            <MapView
                followUserLocation={true}
                style={styless.map}
                zoomEnabled = {true}
                ref={component => {this._map = component;}}
                initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: this.state.latdelta,
                    longitudeDelta: this.state.lngdelta
                }}
            >
                <Marker
                    coordinate={{latitude: this.state.latitude,
                        longitude: this.state.longitude}}
                    image={require('../../../assets/konumum.png')}
                />
                {
                    this.state.haritapois?
                        this.state.haritapois.map(function(mark, i){
                            return (<Marker
                                    coordinate={{latitude: parseFloat(mark.carlat),
                                        longitude: parseFloat(mark.carlng)}}
                                    image={{uri:global.sunucu+"app/data/img/"+haritapoiicon}}
                                />
                            )
                        }):null
                }
                {
                    this.state.applylist && this.state.applylist.length>0?
                        <MapView.Marker
                            coordinate={{latitude: parseFloat(this.state.applylist[0].tolat),
                                longitude: parseFloat(this.state.applylist[0].tolng)}}
                            image={require('../../../assets/mapnereye.png')}
                        />:null
                }


                {
                    this.state.applylist && this.state.applylist.length>0?
                        <MapViewDirections
                            origin={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                            destination={{ latitude: this.state.applylist[0].tolat, longitude: this.state.applylist[0].tolng }}
                            apikey='AIzaSyAqc2J59eq2rLYhgnAlqIitylenG3NOy9k'
                            strokeWidth={7}
                            strokeColor="#00A0B1"
                            onReady={(result) => {
                                console.log(result);
                            }}
                            onError={(errorMessage) => {
                                Alert.alert("Belirtilen noktalar arası ulaşım sağlanamadı");
                            }}
                        />
                        :null
                }


            </MapView>
            <View style={{flexDirection:"row",position:"absolute",top:120,right:10,zIndex:9999}}>
                <Button onPress={this.zoomArtir}  style={{backgroundColor:"#fff",borderRadius:25,width:50,height:50,padding:0,margin:0,justifyContent:"center",alignItems:"center"}}><Icon style={{color:"#000",fontSize:15}} type="FontAwesome" name="plus"/></Button>
                <Button onPress={this.zoomAzalt} style={{backgroundColor:"#fff",borderRadius:25,width:50,height:50,padding:0,margin:0,justifyContent:"center",alignItems:"center",marginLeft:10}}><Icon style={{color:"#000",fontSize:15}} type="FontAwesome" name="minus"/></Button>
            </View>
            {!this.state.applylist || this.state.applylist.length<1?
            <View style={{position:"absolute",bottom:25,zIndex:99,alignSelf:"center"}}>
                {this.state.durumum==1?<View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>this.durumDegis(0)} style={{backgroundColor:"red",height:40,borderRadius:20,paddingLeft:10,paddingRight:10,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#fff",fontWeight:"bold",fontSize:18}}>Çevrimdışı ol</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.cagriGor()} style={{marginLeft:5,backgroundColor:"#00A0B1",height:40,borderRadius:20,paddingLeft:10,paddingRight:10,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#fff",fontWeight:"bold",fontSize:18}}>Çağrıları Gör</Text>
                    </TouchableOpacity>
                </View>:<TouchableOpacity onPress={()=>this.durumDegis(1)} style={{backgroundColor:"green",height:50,borderRadius:25,paddingLeft:25,paddingRight:25,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#fff",fontWeight:"bold",fontSize:22}}>Çevrimiçi ol</Text>
                    </TouchableOpacity>}
            </View>:null}
            {
                this.state.applylist && this.state.applylist.length>0?
            <View style={{backgroundColor:"rgba(255,255,255,0.6)",position:"absolute",bottom:0,zIndex:99,width:deviceWidth,justifyContent:"center",alignItems:"center"}}>
                <Text style={{padding:10,textAlign:"center"}}>Başlangıç: {this.state.applylist[0].fromtext}</Text>
                <View style={{flexDirection:"row",padding:15}}>
                    <View style={{width: width/5,alignItems: 'center',justifyContent: 'center'}}>
                      <TouchableOpacity onPress={()=>this.iconActions(2)} style={{alignItems:"center",justifyContent:"center",backgroundColor:"green",width:55,height:55,borderRadius:55/2}}>
                        <Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="check"/>
                      </TouchableOpacity>
                      <Text style={{fontSize: 13}}>Tamamla</Text>
                    </View>
                    <View style={{width: width/5,alignItems: 'center',justifyContent: 'center'}}>
                      <TouchableOpacity onPress={()=>this.iconActions(1)} style={{alignItems:"center",justifyContent:"center",backgroundColor:"blue",width:55,height:55,borderRadius:55/2,marginLeft:7}}>
                        <Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="map"/>
                      </TouchableOpacity>
                      <Text style={{fontSize: 13}}>Başlangıç</Text>
                    </View>
                    <View style={{width: width/5,alignItems: 'center',justifyContent: 'center'}}>
                      <TouchableOpacity onPress={()=>this.iconActions(4)} style={{alignItems:"center",justifyContent:"center",backgroundColor:"#a0522d",width:55,height:55,borderRadius:55/2,marginLeft:7}}>
                        <Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="map-pin"/>
                      </TouchableOpacity>
                      <Text style={{fontSize: 13}}>Bitiş</Text>
                    </View>
                    <View style={{width: width/5,alignItems: 'center',justifyContent: 'center'}}>
                      <TouchableOpacity onPress={()=>this.iconActions(0)} style={{alignItems:"center",justifyContent:"center",backgroundColor:"cyan",width:55,height:55,borderRadius:55/2,marginLeft:7}}>
                        <Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="comments"/>
                      </TouchableOpacity>
                      <Text style={{fontSize: 13}}>Mesaj</Text>
                    </View>
                    <View style={{width: width/5,alignItems: 'center',justifyContent: 'center'}}>
                      <TouchableOpacity onPress={()=>this.iconActions(3)} style={{alignItems:"center",justifyContent:"center",backgroundColor:"darkblue",width:55,height:55,borderRadius:55/2,marginLeft:7}}>
                        <Icon style={{color:"#fff",fontSize:22}} type="FontAwesome" name="refresh"/>
                      </TouchableOpacity>
                      <Text style={{fontSize: 13}}>İptal Et</Text>
                    </View>
                </View>
            </View>:null}

      </Content>
:null}


      </Container>
    );
  }
}

export default Anasayfa;
