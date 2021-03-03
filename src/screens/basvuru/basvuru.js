import React, { Component } from "react";
import {Image, View, Alert,Picker,Dimensions,TouchableOpacity,TextInput} from "react-native";
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, H1, Accordion, Form, Item, Input, ListItem, CheckBox, Text,Spinner} from "native-base";
import styles from "./styles";
import ImagePicker from 'react-native-image-crop-picker';

const logo = require("../../../assets/logo.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class kayit extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loader:false, phone:null,
        name:null,
        mail:null,
        sifre:null,
        sifret:null,
    		aracmodel:null,
        kosullar:false,
    		aracyili:null,
    		aracplaka:null,
    		cartype:"",
    		phone:"",
    		pass:"",
    		repass:"",
    		carmodel:"",
    		caryil:"",
    		carplate:"",
    		getaractipleri:[],
        kimlikfoto:null,
        aracgorseli:null,
        ruhsat:null,
        d2belge:null,
        tursabd2ackapa:false,
        sabikafoto:null,
        binektaxikapatac:true,
        editable:false
      };
  }
  componentDidMount(){
    setTimeout(() => { this.setState({ editable: true }) }, 100);
  }
  componentWillMount(){
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
                p : 'nologin',
                s : 11

              })

          }).then((response) => response.json()).then((jr) =>
          {
           this.setState({ loader : false,getaractipleri:jr.message });
          }).catch((error) =>
          {
              Alert.alert("Bilgilendirme","Hata Oluştu: "+JSON.stringify(error),[
                {text: 'Kapat', onPress: () => null}
              ]);
              this.setState({ loader : false});
          });

  }
  getirKosullar(){
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
                p : 'nologin',
                s : 10
              })

          }).then((response) => response.json()).then((jr) =>
          {
              Alert.alert("Bilgilendirme",jr.message,[
                {text: 'Kapat', onPress: () => null}
              ]);
           this.setState({ loader : false });
          }).catch((error) =>
          {
              Alert.alert("Bilgilendirme","Hata Oluştu: "+JSON.stringify(error),[
                {text: 'Kapat', onPress: () => null}
              ]);
              this.setState({ loader : false});
          });
  }
  kayitol(){
    this.setState({ loader: false});
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
                p : 'nologin',
                s : 12,
                phone :this.state.phone,
                mail :this.state.mail,
                name :this.state.name,
                pass :this.state.pass,
                repass :this.state.repass,
                kosul:this.state.kosul,
                carmodel:this.state.carmodel,
                caryil :this.state.caryil,
                carplate :this.state.carplate,
                cartype:this.state.cartype,
                kimlikfoto:this.state.kimlikfoto,
                aracgorseli:this.state.aracgorseli,
                ruhsat:this.state.ruhsat,
                d2belge:this.state.d2belge,
                sabikafoto:this.state.sabikafoto
              })

            }).then((response) => response.json()).then((jr) =>
            {
              if(jr["status"] == "1"){
                  Alert.alert("Bilgilendirme",jr.message,[
                    {text: 'Kapat', onPress: () =>    this.props.navigation.goBack()}
                  ]);
                }else{
                  Alert.alert("Bilgilendirme",jr.message,[
                    {text: 'Kapat', onPress: () => this.setState({ loader: false})}
                  ]);
                }
            }).catch((error) =>
            {
                Alert.alert("Bilgilendirme","Hata Oluştu: "+JSON.stringify(error),[
                  {text: 'Kapat', onPress: () =>  this.setState({ loader : false})}
                ]);

            });

  }
  belirle(kac){
	   Alert.alert("Bilgilendirme","Görsel seçmek istediğiniz kaynağı seçin",[
                {text: 'Galeri', onPress: () => {
        					ImagePicker.openPicker({
                    width: 300,
                    height: 300,
                    cropping: true,
                    includeBase64:true
                  }).then(image => {
                  	if(kac==1){
                  		this.setState({
                  			aracgorseli:image.data
                  		});
                  	}else if(kac==2){
                  		this.setState({
                  			ruhsat:image.data
                  		});
                  	}else if(kac==3){
                  		this.setState({
                  			kimlikfoto:image.data
                  		});
                  	}
                    else if(kac==6){
                  		this.setState({
                  			sabikafoto:image.data
                  		});
                  	}
                    else if(kac==4){
                  		this.setState({
                  			d2belge:image.data
                  		});
                  	}
                    else if(kac==11){
                  		this.setState({
                  			ruhsat:image.data
                  		});
                    }
                  });
				}},
                {text: 'Kamera', onPress: () => {
                					ImagePicker.openCamera({
                  width: 300,
                  height: 300,
                  cropping: true,
                  includeBase64:true
                }).then(image => {
                 	if(kac==1){
                		this.setState({
                			aracgorseli:image.data
                		});
                	}else if(kac==2){
                		this.setState({
                			ruhsat:image.data
                		});
                	}else if(kac==3){
                		this.setState({
                			kimlikfoto:image.data
                		});
                	}else if(kac==6){
                		this.setState({
                			sabikafoto:image.data
                		});
                	}else if(kac==4){
                		this.setState({
                			d2belge:image.data
                		});
                	}
                  else if(kac==11){
                    this.setState({
                      ruhsat:image.data
                    });
                  }
                });
				}},
                {text: 'İptal', onPress: () => null}
              ]);
  }
  cartipisec(index)
  {
    if (index==9)
    {
      this.setState({
        cartype: index,
        tursabd2ackapa:true,
        binektaxikapatac:false
      })

    }
    else if(index==12)
    {
      this.setState({
        cartype: index,
        tursabd2ackapa:true,
        binektaxikapatac:false
      })
    }
    else
    {
      this.setState({
        cartype: index,
        tursabd2ackapa:false,
        binektaxikapatac:true
      })
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
        <Header barStyle="kayitbar" androidStatusBarColor='#ffffff'>
        <Left style={{ flex: 1 }}>
          <Button style={styles.headeringeribtn} transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.headeringeriicon} name="arrow-back" />
          </Button>
        </Left>
          <Body>
            <Title>Kayıt Ol</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{ backgroundColor: "white" }}>
          <View style={styles.kayitContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" ></Image>
            <Form style={styles.kayitform}>
              <Item  style={styles.inputitem}>
                <Icon style={styles.loginicons} type="Ionicons" active name="person" />
                <Input placeholder="Ad, Soyad" autoCapitalize="none" onChangeText={(text) => this.setState({ name: text })}/>
              </Item>
              <Item  style={styles.inputitem}>
                <Icon style={styles.loginicons} type="Ionicons" active name="call" />
                <Input placeholder="Telefon Numarası(535*******)" maxLength={10} keyboardType="phone-pad" onChangeText={ (text) => this.setState({ phone: text })} />
              </Item>
              <Item  style={styles.inputitem}>
                <Icon style={styles.loginicons} type="Ionicons" active name="mail" />
                <TextInput editable={this.state.editable} placeholderTextColor="#000" style={{width: 200,fontSize: 16}} onChangeText={ (text) => this.setState({ mail: text })} placeholder="E-Mail"/>
              </Item>
              <Item style={styles.inputitem}>
                <Icon style={styles.loginiconssifre} type="Ionicons" active name="lock" />
                <Input Text="password" placeholder="Şifre" secureTextEntry={true}  onChangeText={ (text) => this.setState({ pass: text })}/>
              </Item>
              <Item style={styles.inputitem}>
                <Icon style={styles.loginiconssifre} type="Ionicons" active name="lock" />
                <Input Text="password" placeholder="Şifre Tekrar" secureTextEntry={true}  onChangeText={ (text) => this.setState({ repass: text })}/>
              </Item>
			  <Item  style={styles.inputitem}>
                <Icon style={styles.loginicons} type="Ionicons" active name="car" />
                <Input placeholder="Araç Modeli" autoCapitalize="none" onChangeText={(text) => this.setState({ carmodel: text })}/>
              </Item>
			  <Item  style={styles.inputitem}>
                <Icon style={styles.loginicons} type="Ionicons" active name="car" />
                <Input placeholder="Araç Yılı" maxLength={4} keyboardType="numeric" onChangeText={(text) => this.setState({ caryil: text })}/>
              </Item>
			  <Item  style={styles.inputitem}>
                <Icon style={styles.loginicons} type="Ionicons" active name="car" />
                <Input placeholder="Araç Plaka" autoCapitalize="none" onChangeText={(text) => this.setState({ carplate: text })}/>
              </Item>
			  <Item style={styles.inputitem}>
                  <Icon style={styles.loginicons} type="Ionicons" active name="car" />
				<Picker
				  selectedValue={this.state.cartype}
				  style={{height: 50, width: deviceWidth,marginLeft:0,paddingLeft:0,margin:0,padding:0}}
				  onValueChange={(itemValue, itemIndex) =>
					this.cartipisec(itemValue)
				  }>
				  <Picker.Item label="Araç Tipi Seçin" value="" />
				  {this.state.getaractipleri.map((v)=>{
					  return (<Picker.Item label={v.isim} value={v.id} />)
				  })}

				</Picker>
			  </Item>
                <View>
                    <Text style={{textAlign:"center",fontWeight:"bold",marginVertical: 10}}>Görseller</Text>
                </View>
                <View style={[styles.inputitem2,this.state.aracgorseli?{backgroundColor:"green"}:null]}>
				<TouchableOpacity onPress={()=>this.belirle(1)}>
                        {this.state.aracgorseli?<Text style={{color:"#fff"}}>Araç Görseli(Plaka gözükmelidir) (Seçildi)</Text>:<Text>Araç Görseli(Plaka gözükmelidir)</Text>}
                    </TouchableOpacity>
                </View>

                {
                  this.state.binektaxikapatac?<View style={[styles.inputitem2,this.state.ruhsat?{backgroundColor:"green"}:null]}>
                      <TouchableOpacity onPress={()=>this.belirle(11)}>
                          {this.state.ruhsat?<Text style={{color:"#fff"}}>Ruhsat Fotoğrafı (Seçildi)</Text>:<Text>Ruhsat Fotoğrafı Fotoğrafı</Text>}
                      </TouchableOpacity>
                  </View>:null
                }
                {
                  this.state.tursabd2ackapa?<View style={[styles.inputitem2,this.state.ruhsat?{backgroundColor:"green"}:null]}>
                      <TouchableOpacity onPress={()=>this.belirle(2)}>
                          {this.state.ruhsat?<Text style={{color:"#fff"}}>Türsab Belgesi Fotoğrafı (Seçildi)</Text>:<Text>Türsab Belgesi Fotoğrafı</Text>}
                      </TouchableOpacity>
                  </View>:null
                }
                <View style={[styles.inputitem2,this.state.kimlikfoto?{backgroundColor:"green"}:null]}>
                   <TouchableOpacity onPress={()=>this.belirle(3)}>
                        {this.state.kimlikfoto?<Text style={{color:"#fff"}}>Kimlik Fotoğrafı (Seçildi)</Text>:<Text>Kimlik Fotoğrafı</Text>}
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputitem2,this.state.sabikafoto?{backgroundColor:"green"}:null]}>
                   <TouchableOpacity onPress={()=>this.belirle(6)}>
                        {this.state.sabikafoto?<Text style={{color:"#fff"}}>Sabıka Belgesi (Seçildi)</Text>:<Text>Sabıka Belgesi</Text>}
                    </TouchableOpacity>
                </View>
                {
                  this.state.tursabd2ackapa?<View style={[styles.inputitem2,this.state.d2belge?{backgroundColor:"green"}:null]}>
                     <TouchableOpacity onPress={()=>this.belirle(4)}>
                          {this.state.d2belge?<Text style={{color:"#fff"}}>D2 Belgesi Seçildi (Seçildi)</Text>:<Text>D2 Belgesi</Text>}
                      </TouchableOpacity>
                  </View>:null
                }

            </Form>
            <Button style={styles.girisbtn} onPress={()=>this.kayitol()}>
              <Text style={styles.txt} uppercase={false}>Başvur</Text>
            </Button>
			<View style={{marginBottom:40}}>

			</View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default kayit;
