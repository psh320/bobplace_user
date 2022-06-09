import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const baseURL = 'https://bobpossible.shop';

const Login = ({}) => {
  const navigation = useNavigation();

  const goMain = useCallback(() => navigation.navigate('MainNavigator'), []);
  const goRegister = useCallback(() => navigation.navigate('Register'), []);
  const goKakao = useCallback(() => navigation.navigate('KakaoLogin'), []);
  const goNaver = useCallback(() => navigation.navigate('NaverLogin'), []);
  return (
    <SafeAreaView style={styles.flex}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={goMain}>
          <View style={{height: 30, width: 30, borderWidth: 1}}>
            <Text>홈</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goRegister}>
          <View style={{height: 30, width: 30, borderWidth: 1}}>
            <Text>가입</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={[styles.loginTitle]}>
        <Text style={[styles.loginHeadText1]}>Mission!</Text>
        <Text style={[styles.loginHeadText2]}>BoBpossible</Text>
        <Text style={[styles.loginSubHeadText]}> 밥미션을 수행하고, 포인트를 적립하라!</Text>
      </View>
      <View style={[styles.logoWrap]}>
        <View style={[styles.logoImage]}></View>
      </View>
      <View style={[styles.loginButtonWrap]}>
        <TouchableOpacity onPress={goKakao}>
          <Image style={[styles.iconButton]} source={require('../assets/images/kakaoIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goNaver}>
          <Image style={[styles.iconButton]} source={require('../assets/images/naverIcon.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={[styles.iconButton]} source={require('../assets/images/appleIcon.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  loginTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23, //디버깅용 메뉴 사라지면 53
  },
  loginHeadText1: {
    fontFamily: 'PretendardSemiBold',
    fontSize: 44,
    fontWeight: 'bold',
  },
  loginHeadText2: {
    fontFamily: 'PretendardSemiBold',
    fontSize: 44,
    fontWeight: 'bold',
    color: '#6C69FF',
  },
  loginSubHeadText: {
    fontFamily: 'PretendardLight',
    color: '#616161',
    fontSize: 17,
    marginTop: 10,
  },
  logoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 280,
    height: 200,
    backgroundColor: '#D9D9D9',
  },
  loginButtonWrap: {
    marginBottom: 30,
    alignItems: 'center',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default Login;
