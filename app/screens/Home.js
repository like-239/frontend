import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../services/GlobalAPI';
import MonthChart from './MonthChart';
//import WeekChart from './WeekChart';
const Home = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('chiPhi');
  const [selectedTimeframe, setSelectedTimeframe] = useState('ngay');
  const [token, setToken] = useState('');
  const Moment = require('moment');
  const [monthTransactions,setMonthTransactions]=useState([]);
  const [showMonthChart, setShowMonthChart] = useState(false);
  const [showWeekChart, setShowWeekChart] = useState(false);
  const [totalBalanceCount, setTotalBalanceCount] = useState(20000000);
  const [transactions, setTransactions] = useState([]);
const [weekTransactions, setWeekTransactions] = useState([]);


  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if(tab !== 'thang') {
      setShowMonthChart(false);
    }
  };
  const handleTimeframePress = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  /*const handleGetTransactions = async () => {
    try {
      const loginData = {
        username: 'admin123',
        password: '123456',
      };
      const authResponse = await API.requestPOST_Login('/auth/login', loginData);
      setToken(authResponse.token);
      const response = await API.requestGET_AllTRANSACTIONS(`/transactions?token=${token}`);
      if (response) {
        const todayTransactions = response.filter(transaction => {
          const transactionDate = moment(transaction.time).startOf('day');
          const currentDate = moment().startOf('day');
          return transactionDate.isSame(currentDate, 'day');
        });
        setTransactions(todayTransactions);
      } else {
        console.log('Get failed:', response.status);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  */
  const handleGetWeekTransactions = async () => {
    try {
      const loginData = {
        username: 'admin123',
        password: '123456',
      };
      const authResponse = await API.requestPOST_Login('/auth/login', loginData);
      setToken(authResponse.token);
  
      // Xác định thời gian bắt đầu và kết thúc của tuần hiện tại
      const startOfWeek = moment().startOf('week');
      const endOfWeek = moment().endOf('week');
  
      const response = await API.requestGET_AllTRANSACTIONS(`/transactions?token=${authResponse.token}`);
      if (response) {
        // Lọc các giao dịch trong tuần từ dữ liệu trả về
        const weekTransactions = response.filter(transaction => {
          const transactionDate = moment(transaction.time);
          return transactionDate.isBetween(startOfWeek, endOfWeek, undefined, '[]');
        });
        setWeekTransactions(weekTransactions);
        console.log('weektransactions',weekTransactions);
      } else {
        console.log('Get failed:', response.status);
      }
      setShowWeekChart(true);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  const handleGetMonthTransactions = async () => {
    try {
      const loginData = {
        username: 'admin123',
        password: '123456',
      };
      const authResponse = await API.requestPOST_Login('/auth/login', loginData);
      setToken(authResponse.token);
  
      // Xác định thời gian bắt đầu và kết thúc của tháng hiện tại
      const startOfMonth = moment().startOf('month');
      const endOfMonth = moment().endOf('month');
  
      const response = await API.requestGET_AllTRANSACTIONS(`/transactions?token=${token}`);
      if (response) {
        // Lọc các giao dịch trong tháng từ dữ liệu trả về
        const monthTransactions = response.filter(transaction => {
          const transactionDate = moment(transaction.time);
          return transactionDate.isBetween(startOfMonth, endOfMonth, undefined, '[]');
        });
        setMonthTransactions(monthTransactions);
        console.log('monthTransactions in Home page', monthTransactions);
      } else {
        console.log('Get failed:', response.status);
      }
      setShowMonthChart(true);
      
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const updateTotalBalanceCount = (amount) => {
    setTotalBalanceCount(prevCount => prevCount - amount);
  };
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  

  return (
    <View style={styles.Container}>
      <View style={styles.TopContainer}>
        <View style={styles.TopleftContainer}>
          <Image source={require('./SideMenuIcon.png')} style={styles.icon} />
        </View>
        <Text style={styles.TotalBalance}>Tổng số dư</Text>
        <View style={styles.TopRightContainer}>
          <Image source={require('./notice-1-512.png')} style={styles.noticeIcon} />
        </View>
      </View>

      <View style={styles.TotalCountContainer}>
  <Text style={styles.TotalBalanceCount}>{formatNumberWithCommas(totalBalanceCount)}</Text>
</View>


      <View style={styles.incomeContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'chiPhi' && styles.selectedTab]}
          onPress={() => {
            handleTabPress('chiPhi');
          }}>
          <Text style={styles.income}>CHI PHÍ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'thuNhap' && styles.selectedTab]}
          onPress={() => {
            handleTabPress('thuNhap');
          }}>
          <Text style={styles.income}>THU NHẬP</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'chiPhi' ? (
        <View style={styles.chiPhiScreen}>
          <View style={styles.TimeChoice}>
            <TouchableOpacity
              style={[styles.tab, selectedTimeframe === 'ngay' && styles.selectedTab]}
              onPress={() => {
                handleTimeframePress('ngay');
                setShowMonthChart(false);
              }}>
              <Text style={styles.income}>Ngày</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTimeframe === 'tuan' && styles.selectedTab]}
              onPress={() => {
                handleTimeframePress('tuan');
                setShowMonthChart(false);
                handleGetWeekTransactions();
                setShowWeekChart(true);
              }}
              
              >
              <Text style={styles.income}>Tuần</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTimeframe === 'thang' && styles.selectedTab]}
              onPress={() => {
                handleTimeframePress('thang');
                handleGetMonthTransactions();
              }}>
              <Text style={styles.income}>Tháng</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTimeframe === 'nam' && styles.selectedTab]}
              onPress={() => {
                handleTimeframePress('nam');
                setShowMonthChart(false);
              }}>
              <Text style={styles.income}>Năm</Text>
            </TouchableOpacity>
          </View>

          {showMonthChart && <MonthChart transactions={monthTransactions} />}
            {/*
            {showWeekChart   && <WeekChart transactions={weekTransactions}/>}*/}
          <TouchableOpacity onPress={() => navigation.navigate('AddTransaction', { updateTotalBalanceCount })} style={styles.addIconContainer}>
    <Image source={require('./add.png')} style={styles.addIcon} />
          
  </TouchableOpacity>
 

        </View>
      ) : (
        <View style={styles.thuNhapScreen}>
          <View style={styles.chiPhiScreen}>
            <View style={styles.TimeChoice}>
              <Text> Ngày </Text>
              <Text>Tuần</Text>
              <Text>Tháng</Text>
              <Text>Năm</Text>
            </View>

            <View style={styles.TotalCountContainer}>
              <Text style={styles.Time}>Tháng</Text>
            </View>

           
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
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
  icon: {
    width: 30,
    height: 30,
  },
  addIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom:20,
    marginTop:-10,
    //paddingTop:20
   
  },
  noticeIcon: {
    width: 30,
    height: 30,
  },
  TotalBalance: {
    fontFamily: 'Courier New',
    fontSize: 20,
    fontWeight: 'bold',
  },
  TotalCountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TotalBalanceCount: {
    fontFamily: 'Arial',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#5163BF',
  },
  income: {
    fontFamily: 'Courier New',
    fontSize: 20,
    fontWeight: 'bold',
  },
  incomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    marginTop: 15,
  },
  TimeChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  Time: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
  },
  chiPhiScreen: {
    backgroundColor: '#ffff',
    flex:1
  },
  thuNhapScreen: {
    backgroundColor: '#ffff',
    flex:1
  },
  addIconContainer: {
    position: 'absolute', // Thiết lập vị trí tuyệt đối để có thể đặt nó trên biểu đồ
    bottom: 20, // Điều chỉnh vị trí theo y
    right: 20, // Điều chỉnh vị trí theo x
    marginTop:-10
  },  
  inputWrapper: {
    borderColor: '#000000',
    backgroundColor: '#FAFAFC',
    borderWidth: 1,
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});

export default Home;
