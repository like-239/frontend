import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import React, { useEffect, useState, } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { showMessage } from "react-native-flash-message";
import API from '../services/GlobalAPI';
const AddTransaction=({route})=>{
    const navigation = useNavigation();
    const [containerHeight, setContainerHeight] = useState(0);
    const window = useWindowDimensions();
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [time, setTime] = useState('');
    const [transaction_type, setTransaction_type] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [yesterdayDate, setYesterdayDate] = useState('');
    const [tomorrowDate, setTomorrowDate] = useState('');
    const [token, setToken] = useState(''); 
    const [weekDates, setWeekDates] = useState([]);
    const handleAddTransaction = () => {
     
      const amount = parseInt(cost);
      
      route.params.updateTotalBalanceCount(amount);
  
      // Quay lại trang Home sau khi thêm giao dịch thành công
      navigation.goBack();
    };
    const handleCreateTransaction=async()=>{
      try {
        const loginData = {
          username: 'admin123',
          password: '123456',
        };
  
      const transactionData = {
        cost,
        category,
        note,
        time,
        transaction_type
      };
      const authResponse = await API.requestPOST_Login('/auth/login', loginData);
      setToken(authResponse.token)
      console.log(authResponse.token)
      const response = await API.requestPost_Transaction(`/transactions/create?token=${authResponse.token}`, transactionData);
  
      if ( response.success) {
       
        console.log('Create successful:', response.message);
        console.log('Transaction details:', response.data);
        showMessage({
          message: 'Tạo thành công',
          type: 'success',
        });
        navigation.navigate('Home');
      } else {
        //console.log(transactionData);
        console.log('Create failed:', response.status);
      }
    } catch (error) {
    
      console.error('Error :', error); 
    }
   
    };
    const handleCategorySelection = (selectedCategory) => {
      setCategory(selectedCategory); 
  
    };
    const handleExpenseTabPress = () => {
      setTransaction_type('chi phí');
    };
  
    const handleIncomeTabPress = () => {
      setTransaction_type('thu nhập'); 
    };
    useEffect(() => {
      
      const today = Moment().format('DD/MM');
      setCurrentDate(today);
 
const weekDates = [];


      
      const yesterday = Moment().subtract(1, 'days').format('DD/MM');
      setYesterdayDate(yesterday);
  
  
      const tomorrow = Moment().add(1, 'days').format('DD/MM');
      setTomorrowDate(tomorrow);
    }, []);
    const handleTodayPress = () => {
      const today = Moment().format('YYYY-MM-DD');
      setTime(today);
    };
    
    const handleYesterdayPress = () => {
      const yesterday = Moment().subtract(1, 'days').format('YYYY-MM-DD');
      setTime(yesterday);
    };
    
    const handleTomorrowPress = () => {
      const tomorrow = Moment().add(1, 'days').format('YYYY-MM-DD');
      setTime(tomorrow);
    };
    
    useEffect(() => {
        setContainerHeight(window.height / 6);
    }, [window.height]);
    
      const [selectedTab, setSelectedTab] = useState('chiPhi'); 
    
      const handleTabPress = (tab) => {
        setSelectedTab(tab);
      };
      const getStartOfWeek = (date) => {
        return Moment(date).startOf('week');
    };

    // Hàm để tính toán các ngày trong tuần
    const calculateWeekDates = (startDate) => {
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            weekDates.push(Moment(startDate).add(i, 'days'));
        }
        return weekDates;
    };

    useEffect(() => {
        // Lấy ngày hiện tại
        const today = Moment();
        setCurrentDate(today.format('DD/MM'));

        // Lấy ngày hôm qua
        const yesterday = Moment().subtract(1, 'days');
        setYesterdayDate(yesterday.format('DD/MM'));

        // Lấy ngày bắt đầu của tuần và tính toán các ngày cùng tuần
        const startOfWeek = getStartOfWeek(today);
        const weekDates = calculateWeekDates(startOfWeek);

        // Lưu các ngày cùng tuần vào state
        setWeekDates(weekDates);
    }, []);
    
    const getUserDetails = (startDate) => {
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
          weekDates.push(Moment(startDate).add(i, 'days'));
      }
      return weekDates;
  };
    
    return(
        <View style={styles.Container}>
            <View style={[styles.TopContainer, { height: containerHeight }]}>
            <View style={styles.titleContainer}>
            <Image
         source={require('./arrow.png')} 
         style={styles.backBTN}
        />
        
            <Text style={styles.title}> Thêm giao dịch</Text>
            </View>

                <View style={styles.coverTransactionText}>
                  <TouchableOpacity
                   style={[styles.tab, selectedTab === 'chiPhi' && styles.selectedTab]}
                   onPress={() => {handleTabPress('chiPhi')
                   handleExpenseTabPress();
                  }}>
<Text style={styles.transactionText}>CHI PHÍ </Text>
                  </TouchableOpacity>
            <TouchableOpacity  
             style={[styles.tab, selectedTab === 'thuNhap' && styles.selectedTab]}
          onPress={() => {
            handleTabPress('thuNhap')
            handleIncomeTabPress();
          }}>
 <Text style={styles.transactionText}> THU NHẬP</Text>
            </TouchableOpacity>           
            </View>


         
           
 {selectedTab === 'chiPhi' ? (
        <View style={styles.chiPhiScreen}>
         
          <View style={styles.moneyContainer}>
            <Text style={styles.unit}>VND</Text>
            <TextInput style={styles.moneyInput}
             onChangeText={(text) => setCost(text)}
             value={cost}
            ></TextInput>
            </View>

          <Text style={styles.category}>Danh mục:</Text>
            <View style={styles.categoryIconTopContainer}>
            <TouchableOpacity style={styles.categoryIconWithText}
             onPress={() => handleCategorySelection('sức khỏe')}
            >
        <Image
            source={require('./health.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Sức khỏe</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.categoryIconWithText}
    onPress={() => handleCategorySelection('ăn uống')}
    >
        <Image
            source={require('./eating.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Ăn uống</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.categoryIconWithText}
    onPress={() => handleCategorySelection('giáo dục')}
    >
        <Image
            source={require('./education.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Giáo dục</Text>
    </TouchableOpacity>
        </View>

        <View style={styles.categoryIconBottomContainer}>
        <TouchableOpacity style={styles.categoryIconWithText}
        onPress={() => handleCategorySelection('giải trí')}
        >
        <Image
            source={require('./entertainment.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Giải trí</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.categoryIconWithText}
    onPress={() => handleCategorySelection('gia đình')}
    >
        <Image
            source={require('./family.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Gia đình</Text>
    </TouchableOpacity>
    <Image
    source={require('./add.png')} 
    style={styles.addIcon}
  />
            </View>
            <TouchableOpacity style={styles.calendarContainer}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <TouchableOpacity onPress={handleTodayPress}>
        <Text style={styles.dateText}>Hôm nay:</Text><Text style={styles.dateText}> {currentDate}</Text>
      </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <TouchableOpacity onPress={handleTodayPress}>
        <Text style={styles.dateText}>Hôm qua:</Text><Text style={styles.dateText}> {yesterdayDate}</Text>
      </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <TouchableOpacity onPress={handleTodayPress}>
        <Text style={styles.dateText}>Ngày mai:</Text><Text style={styles.dateText}> {tomorrowDate}</Text>
      </TouchableOpacity>
      </View>
  </View>
  <Image
    source={require('./calendar.png')}
    style={styles.calendar}
  />
</TouchableOpacity>



            <Text style={styles.note}>Ghi chú:</Text>
     <TextInput style={styles.menuItem} 
     onChangeText={(text) => setNote(text)}
     value={note}
    /> 
    <Pressable
               onPress={() => {
                handleCreateTransaction();  
                handleAddTransaction();
              }}
              style={{
                backgroundColor: '#5063BF',
                borderRadius: 10,
                padding: 15,
                marginTop:15,
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
               THÊM
              </Text>
            </Pressable>{/*
            {weekDates.map((date, index) => (
                <Text key={index}>{date.format('DD/MM')}</Text>
            ))}
          */}
        </View>
      ) : (
        <View style={styles.thuNhapScreen}>
          {/* Giao diện cho thu nhập */}
          <View style={styles.moneyContainer}>
            <Text style={styles.unit}>VND</Text>
            <TextInput style={styles.moneyInput}></TextInput>
            </View>

          <Text style={styles.category}>Danh mục:</Text>
            <View style={styles.categoryIconTopContainer}>
            <View style={styles.categoryIconWithText}>
        <Image
            source={require('./salary.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Lương</Text>
    </View>
    <View style={styles.categoryIconWithText}>
        <Image
            source={require('./side-job.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Việc làm thêm</Text>
    </View>
    <View style={styles.categoryIconWithText}>
        <Image
            source={require('./investment.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Đầu tư</Text>
    </View>
        
        </View>

        <View style={styles.categoryIconBottomContainer}>
        <View style={styles.categoryIconWithText}>
        <Image
            source={require('./scholarship.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Học bổng</Text>
    </View>
    <View style={styles.categoryIconWithText}>
        <Image
            source={require('./gift.png')} 
            style={styles.categoryIcon}
        />
        <Text style={styles.categoryText}>Quà tặng</Text>
    </View>
    <Image
    source={require('./add.png')} 
    style={styles.addIcon}
  />

            </View>
            <Text style={styles.note}>Ghi chú:</Text>
     <TextInput style={styles.menuItem}
     onChangeText={(text) => setNote(text)} 
     value={note}
    /> 
     
    <Pressable
               onPress={() => {
                handleCreateTransaction();  
              }}
              style={{
                backgroundColor: '#5063BF',
                borderRadius: 10,
                padding: 15,
                marginTop:10,
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
               THÊM
              </Text>
            </Pressable>
        </View>
      )}
     
            </View>
           
        </View>
    );
}
const styles = StyleSheet.create({
    Container:{
      backgroundColor:'#FFFFFF',
      flex: 1,
    },
    TopContainer: {
        paddingHorizontal: 20, 
        backgroundColor: "#5163BF", 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        width: '100%',
    resizeMode:"cover"
      },
      transactionText:{
        fontWeight:'bold',
        fontFamily: 'Arial',
    fontSize:20,
    color:'#FFFF',
        //marginLeft:10,
        paddingLeft:30,
        paddingRight:30
      },
      coverTransactionText:{
        
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
      },
      unit:{
        fontWeight:'bold',
        fontFamily: 'Arial',
    fontSize:20,
    color:'#5163BF',
    marginTop:10,
    
    color:'#5163BF',
    justifyContent:'center',
     alignContent:'center',
      },
      moneyInput:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
      borderBottomWidth: 1,
      borderColor: '#808080',
      marginTop: -5,
      marginLeft:10,
      //marginHorizontal: 10, 
      fontWeight:'bold',
      fontFamily: 'Arial',
  fontSize:20,
    color:'#1E1E1E'
      },
      moneyContainer:{
        flexDirection:'row',
        marginTop: 10,
        //alignItems: 'center',
        justifyContent: 'center', 
      },

      title:{
            fontWeight: 'bold',
            fontSize:21,
            color:'#FFFF',
           justifyContent:'center',
            marginTop:10,
            textAlign:'center',
            flex: 1,
            marginLeft:-50 
      },
      titleContainer:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        //paddingHorizontal: 20, 
        marginTop: 10, 
        alignItems:'center',
        paddingHorizontal: 10, 
      },
      backBTN:{
        width:30,
        height:30,
        marginLeft:-5,
        marginTop:15
      },
      
      category:{
        fontWeight: 'bold',
        fontSize:20,
        color:'#000000',
       paddingTop:20
      },
      categoryIcon:{
        width:65,
        height:65,
        paddingHorizontal:20,
        marginHorizontal:30
      },
      categoryIconTopContainer:{
        flexDirection:'row',
        //paddingHorizontal:40,
        paddingTop:30,
        marginLeft:10,
        marginRight:10
      },
      categoryIconBottomContainer:{
        flexDirection:'row',
        paddingTop:30,
        marginLeft:10,
        marginRight:10
      },
      categoryIconWithText: {
        alignItems: 'center',
    },
    categoryText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
        color: '#000000',
    },
    note:{
      marginLeft: 10, 
      marginTop:50,
      fontSize:20,
      fontWeight:'bold',
      color:'#000000'
    },
    menuItem:{
      flexDirection:'row',
      borderColor:'#808080',
      borderBottomWidth:1,
      marginTop:15,     
      marginBottom:10,
      fontWeight:'bold',
      fontFamily: 'Arial',
  fontSize:20,
    color:'#000000'
    },
    addIcon:{
      width: 65,
      height: 65,
      paddingHorizontal:20,
      marginHorizontal:30
     
    },
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      marginBottom: 10,
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    selectedTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#fff',
    },
    tabText: {
      fontSize: 16,
    },
    chiPhiScreen: {
   
      backgroundColor: '#ffff', 
    },
    thuNhapScreen: {
      backgroundColor: '#ffff', 
    },
    calendar:{
      width: 50,
  height: 50,
  marginLeft: 10,
    },
    calendarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
    },
    dateText: {
      fontSize: 16,
      marginTop: 5,
      color: '#000000',
      marginLeft: 10,
       
    },
    dateTextContainer: {
      flexDirection: 'column', // Hiển thị các chú thích theo chiều dọc
    },
})
export default AddTransaction;
