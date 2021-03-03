const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  offlineContainer: {
   backgroundColor: '#b52424',
   height: 55,
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'row',
   position: 'absolute',
   top: 30,
   width:'100%',
   zIndex:99999999
 },
 offlineText: {
   color: '#fff'
 },
  anasayfaGenel: {
position:"absolute",
left:0,
top:0,
zIndex:1,
height:deviceHeight
  },
  adim2btn:{
    backgroundColor: '#ffffff',
            position: 'absolute',
            bottom: 80,
            right: 10,
            zIndex:9999,
            height:50,
            width:50,
            borderRadius:50,
            justifyContent: 'center'
  },
  adim2btnicon: {
    color:'#6cbd45',
    fontSize: 30
  },
  touchable: {
    flex:1,
    width:'100%'

  },
  logoOrtala: {
flex: 1
  },
  logo: {
    height: 50,
    width: 123,
    justifyContent: 'center',
   alignItems: 'center',
    alignSelf: 'center'
  },
header:{

  },
  headerview: {
    position: 'absolute',
       top: 0,
       left: 0,
       width: deviceWidth,
       height: 100,
       zIndex: 999999,
       paddingTop: 0
  },
  headeringeribtn: {
    color:'#000'
  },
  headeringeriicon: {
    color:'#000',
    fontSize: 40
  },
    headerinalarmicon:{
        color:'#FF0000',
        fontSize: 32,
        marginRight:10,
        marginTop:10,
    },
  headerinbildirimicon: {
    color:'#000',
    fontSize: 32,
    marginRight:10,
    marginTop:10,
  },
  indicator: {
    flex:1,
    position:'absolute',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor:'#fff',
    zIndex:9999999,
    opacity:0.6,
    justifyContent: 'center',
   alignItems: 'center'
 },
 asamaaracsecview:{
   backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
  bottom: 10,
    zIndex:9999,
   height:'auto',
   borderRadius:10,
 },
 asamaracscroll:{
   backgroundColor:'#fbfbfb',
   borderRadius:10,
   flexDirection: 'row',
   margin:15,
   paddingTop:15,
   paddingBottom:15,
 },
 asaaracsecinview:{
   width:deviceWidth / 4.8,
   padding:0,
   justifyContent: 'center',
       alignItems: 'center',
       marginRight:5,
       marginLeft:5
 },
 asaaracsecinviewinview:{
   marginLeft:15,
 },
 asaaracsecinviewtext:{
   backgroundColor:'#cdd0d2',
   padding:3,
   borderRadius:3,
   color:'#fff',
   marginTop:10,
   fontSize:45
 },
 asama2getiraracview:{
   margin:15,
   backgroundColor:'#fff',
   borderRadius:10,
   padding:15,
   position: 'absolute',
   bottom: 10,
   zIndex:9999,
   height:'auto',
   width:deviceWidth - 30
 },
 asama2getirarackisiview:{
   flex:1,
   flexDirection:'row',
   paddingBottom:15
 },asama2getirarackisiview1:{
   width:90
 },asama2getirarackisiview2:{
   width:deviceWidth - 60 - 90 - 80
 },asama2getirarackisiview3:{
   width:150,
   justifyContent: 'center',
   alignItems: 'flex-end',
 },asama2getirarackisiview2a:{
   width:deviceWidth - 60 - 90 - 80,
   justifyContent:'center',
   alignItems:'center'
 },
 asama2getirarackisibilgiview:{
   flex:1,
   flexDirection:'row',
   borderTopColor:'#EAEAEA',
   borderTopWidth:1,
   paddingTop:15
 },asama2getirarackisibilgiviewelem:{
   justifyContent: 'center',
       alignItems: 'center',
       borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor:'#EAEAEA',
    paddingTop:15
 },
 pincswipe:{
   marginRight:15,
   padding:10,
 },
swiperow:{
borderRadius:0,
   marginBottom:0,
   borderBottomWidth:1,
   borderColor:"#f9f9f9",
   paddingTop:10,
   paddingBottom:10,
   borderLeftWidth: 0,
   marginLeft:0,
   marginRight:0,
   marginTop:0,
   paddingRight:0,
   paddingLeft:0,
   backgroundColor:"#fff",

   borderRadius:0
},
 swipegecmis:{
   backgroundColor:'#fff',
   flex:1,
   flexDirection:'row'
 },sgleft:{
   flex:0.2
 },sgcenter:{
   flex:0.5,
   alignItems:'stretch'
 },sgright:{
   flex:0.3,
 },pagetitle:{
   color:'#000',
        fontWeight:"bold",
   alignItems:'center',
   marginBottom:10,
   textAlign:'center'
 },destekform:{
   marginRight:20,
   marginLeft:10
 },destekicons:{
   width:45,
   paddingLeft:15
 },
 inputitem:{
   borderStyle: 'solid',
   borderLeftWidth: 1,
   borderRightWidth: 1,
   borderTopWidth: 1,
   borderColor: '#E3E4E6',
   borderRadius: 5,
   marginTop:5,
   marginBottom:5,
   marginLeft:0
 },inputdestek:{
   width:'100%',
   fontSize:15,
   color:'#000',
   margin:0,
   padding:0
 },inputdestektextarea:{
   width:'100%',
   fontSize:15,
   color:'#000',
   marginLeft:-5,
   padding:10
 },  inputitem:{
     borderStyle: 'solid',
     borderLeftWidth: 1,
     borderRightWidth: 1,
     borderTopWidth: 1,
     borderColor: '#E3E4E6',
     borderRadius: 5,
     marginTop:5,
     marginBottom:5,
     marginLeft:0
   },  loginicons:{
       color: "#B0B1B7",
       paddingLeft:10,
       paddingRight:10
     },
     loginiconssifre:{
       color: "#B0B1B7",
       paddingLeft:12,
       paddingRight:12
     },
     hicyok:{
      width:deviceWidth-20,
       textAlign:'center'
     },
     modal: {
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor:'#fff'
       },
       modal3: {
           height: deviceHeight * 0.6,
           width: deviceWidth - 100,
           padding:25,
           borderRadius:15,

         },
    listint:{
      flexDirection:"row",
        padding:10,
        borderBottomWidth:1,
        borderColor:"#f9f9f9"
    },
    listintbaslik:{},
    listinticerik:{
      paddingLeft:10,
        fontWeight: "bold"
    }
};
