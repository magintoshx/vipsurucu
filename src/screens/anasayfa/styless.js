const React = require("react-native");
const { Dimensions, Platform } = React;
let { width, height } = Dimensions.get('window');

export default {
  map: {
    flex: 1,
      width: width,
      height: height,
      zIndex:1,
      opacity: 1,

  },
  inputview:  {
    backgroundColor: 'rgba(0,0,0,0)',
            position: 'absolute',
            top: 120,
            left: 15,
            right: 15,
            zIndex:9999
  },
  inputview2:  {
    backgroundColor: 'rgba(0,0,0,0)',
            position: 'absolute',
            bottom: 20,
            left: 15,
            right: 15,
            zIndex:9999
  },    inputview2adim2:  {
        backgroundColor: 'rgba(0,0,0,0)',
                position: 'absolute',
                top:170,
                left: 15,
                right: 15,
                zIndex:9999
      },
  nereyeara:{
    backgroundColor:'#fff',
    borderRadius:10,
    shadowColor: '#000',
 shadowOffset: { width: 10, height: 20 },
 shadowOpacity: 0.8,
 shadowRadius: 222,
  },
  nereyearaadim2:{
    backgroundColor:'#fff',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    shadowColor: '#000',
 shadowOffset: { width: 10, height: 20 },
 shadowOpacity: 0.8,
 shadowRadius: 222,
  },
  adresnereyeicon:{
    color:'#6cbd45',
    marginLeft: 15,
    fontSize:25
  },

  adresara:{
    backgroundColor:'#fff',
    borderRadius:10,
    shadowColor: '#000',
 shadowOffset: { width: 10, height: 20 },
 shadowOpacity: 0.8,
 shadowRadius: 222,
  },
  adresarasecim:{
    backgroundColor:'#fff',
borderTopLeftRadius:10,
borderTopRightRadius:10,
    shadowColor: '#000',
 shadowOffset: { width: 10, height: 20 },
 shadowOpacity: 0.8,
 shadowRadius: 222,
  },
  adresaraicon:{
    color:'#9444a5',
    marginLeft: 15,
    fontSize:25
  },
  adresarainput:{
  }
};
