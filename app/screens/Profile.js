import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
const Profile = () => {
    const navigation = useNavigation();
    return(
      <View style={styles.container}>
        <View style={styles.inforContainer}> 
        <Image
         source={require('./back.png')} 
         style={styles.backBTN}
        />

      <Text style={styles.SignupText}> Your Profile</Text>
     <View style={{ flex: 1 }}/>
     
     </View>
<View style={styles.avatarContainer}>
     <Image
       source={require('./57.png')} 
       style={styles.avatar }
       
     />
     </View>
      
     <Text style={styles.infor}>Persional Information</Text>
     
     <View style={styles.wrapper}>    
              <View style={styles.userName}>
                <Text style={styles.persionalInfor}>Username</Text>
                  <Text >Aryan5201</Text>
              </View>
            </View>

            <View style={styles.wrapper}>
              
              <View style={styles.inputWrapper}>
                
              <Text style={styles.persionalInfor}>Email</Text>
                  <Text >Aryan5201@gmail.com</Text>
              </View>
            </View>

            <View style={styles.wrapper}>
              
              <View style={styles.inputWrapper}>
                
              <Text style={styles.persionalInfor}>Mobile phone</Text>
                  <Text >12345678</Text>
              </View>
            </View>

            <View style={styles.wrapper}>
              
              <View style={styles.inputWrapper}>
              <Text style={styles.persionalInfor}>Address</Text>
                  <Text >Viet Nam</Text>
              </View>
            </View>

            <View style={styles.wrapper}>
              
              <View style={styles.inputWrapper}>
              <Text style={styles.persionalInfor}>Password</Text>
                  <Text >********</Text>
              </View>
            </View>

      </View>
    )
}
const styles = StyleSheet.create({
  SignupText:{
    fontWeight: 'bold',
    fontSize:20,
    color:'#000000',
    //marginLeft: 30, 
    marginTop:10,
    textAlign:'center',
    flex: 1,
    marginLeft:50
  },
  container:{
    backgroundColor:'#FFFFFF',
    flex: 1,
  },
  avatar:{
    width: 150,
    height: 150,
    borderRadius: 999,
    marginTop: 50,
    resizeMode:"cover",
    borderWidth:2,
  
    
  },
  avatarContainer:{
    //flex:1,
    alignItems:"center",
    //marginTop: -40,
  marginBottom: 20,
  
  },
  infor:{
    fontSize:20,
    color:'#5265BE',
    fontWeight:'bold',
    marginTop:10,
    paddingLeft:20
  },
  inforContainer:{
    flexDirection: 'row', 
    justifyContent: 'center', 
    paddingHorizontal: 20, 
    marginTop: 50, 
    alignItems:'center',

  },
  label:{
    marginBottom: 20,
    fontFamily: 'regular',
    //fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
    //color: COLORS.black,
    fontWeight: 'bold',
  },
  wrapper:{
    marginTop:10
  },
  inputWrapper: {
    backgroundColor: '#F4F4F4',
   
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    //marginTop:10,
    marginHorizontal:10,
    justifyContent: 'space-between', 

  },
  TopContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    marginTop: 50, 

  },
  TopleftContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  TopRightContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  backBTN:{
    width:50,
    height:50
  },
  persionalInfor:{
    color:'#5164BF',
    fontSize:14,
    fontWeight:'bold'
  },
  userName:{
    //borderColor: '#808080',
    backgroundColor: '#F4F4F4',
    //borderWidth: 0.5,
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop:10,
    marginHorizontal:10,
    justifyContent: 'space-between', 
  }
})
export default Profile;
