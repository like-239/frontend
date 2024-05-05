import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import API from '../services/GlobalAPI';
const Login = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [userName, setUserName] = useState('');
    const [userEmail,setUserEmail]=useState('');
    const [message, setMessage] = useState('');
  
    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye') {
        setRightIcon('eye-off');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-off') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
      }
    };
  /*
    const handleLogin = async () => {
      const loginData = {
        username: userName,
        password: password,
      };
  
      const response = await API.requestPOST_Login('/auth/login', loginData);
      if (response && response.token) {
        setUserName('');
        setPassword('');
        navigation.navigate('Home');

      }else {
        
        showMessage({
          message: "Lỗi",
          description: "Email hoặc mật khẩu sai. Vui lòng kiểm tra lại.",
          type: "danger",
          position: 'top', 
          duration: 5000,
          icon: props => <AntDesign name='warning' size={22} color={COLORS.white} style={{padding: 10}}{...props} />,
        });
      }
     
    };
  */

    return (
        <View style={styles.container}>
                
                <Image
               source={require('./Group91.png')} 
               style={styles.logo }
               
             />
        
             <Text style={styles.SignupText}>Login</Text>
             <Text style={styles.emailText}>Username</Text>
             <TextInput style={styles.menuItem}
              onChangeText={(text) => setUserName(text)}
              value={userName}
             >
             </TextInput>
        
             <Text style={styles.emailText}>Password</Text>
             <TextInput style={styles.menuItem}
              value={password}
              onChangeText={text => setPassword(text)}
             >
             </TextInput>
           
             
        
             <Pressable
                         //onPress={handleLogin}
                      style={{
                        backgroundColor: '#5063BF',
                        borderRadius: 10,
                        padding: 15,
                        marginTop:45,
                        marginLeft:50,
                        marginRight:50
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Đăng nhập
                      </Text>
                    </Pressable>
        
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUp')}
                      style={{marginTop: 15}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#000000',
                          fontSize: 16,
                        }}>
                        Bạn đã chưa tài khoản?{' '}
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#808080',
                            fontSize: 16,
                          }}>
                          Đăng ký
                        </Text>
                      </Text>
                    </TouchableOpacity>
              </View>
            );

}
const styles = StyleSheet.create({
    container:{
      backgroundColor:'#FFFFFF',
      flex: 1,
    },
    iconStyle: {
      marginRight: 20,
    },
    logo:{
      marginLeft: 30, 
      marginTop:50
    },
    SignupText:{
      fontWeight: 'bold',
      fontSize:35,
      color:'#000000',
      marginLeft: 30, 
      marginTop:10,
    },
    emailText:{
      marginLeft: 30, 
      marginTop:50,
      fontSize:13,
    },
    menuItem:{
      flexDirection:'row',
      paddingVertical:13,
      paddingHorizontal:35,
      borderColor:'#808080',
      borderBottomWidth:1,
      marginTop:15,
      marginHorizontal:30
    },
   } );  
  export default Login;
