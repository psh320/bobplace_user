import React, {useCallback, useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import SocialWebviewModal from '../../modal/SocialWebviewModal';
import auth from '@react-native-firebase/auth';
import {customAxios} from '../../api/customAxios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../../assets/CalculateLength';

const Login = () => {
  const navigation = useNavigation();
  const [loginModal, setLoginModal] = useState(false);
  const [source, setSource] = useState('');

  const postLogin = async (data: any) => {
    try {
      const response = await customAxios().post('/auth/authorization/login', null, {
        params: data,
      });
      try {
        await AsyncStorage.multiSet([
          ['accessToken', response.data.result.accessToken],
          ['refreshToken', response.data.result.refreshToken],
        ]);
      } catch (e) {
        console.log('로그인 로컬 저장 에러남...');
      }

      if (response.data.result.registerStatus === 'NEW') {
        navigation.navigate('Register');
      } else {
        navigation.navigate('MainNavigator');
      }
    } catch (error) {
      console.log('login data:', error);
    }
  };

  const postAppleLogin = async (token: string) => {
    try {
      const response = await customAxios().post('/auth/authorization/apple-login', {token: token});
      try {
        await AsyncStorage.multiSet([
          ['accessToken', response.data.result.accessToken],
          ['refreshToken', response.data.result.refreshToken],
        ]);
      } catch (e) {
        console.log('로그인 로컬 저장 에러남...');
      }

      if (response.data.result.registerStatus === 'NEW') {
        navigation.navigate('Register');
      } else {
        navigation.navigate('MainNavigator');
      }
    } catch (error) {
      console.log('login data:', error);
    }
  };

  //실행시 구글 로그인 설정 + 로그인 확인 코드
  useEffect(() => {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure({
        webClientId: '875664333601-tcsjcab1onq9fjurhimnr0qeg0fj0qm7.apps.googleusercontent.com',
      });
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('If this function executes, User Credentials have been Revoked');
      });
    } else {
      GoogleSignin.configure({
        webClientId: '875664333601-gdsrl919s9db2bqcre9emulifoa8rrp6.apps.googleusercontent.com',
      });
    }
  }, []);

  const signUpWithSNS = async (social: string) => {
    setSource(`https://bobpossible.shop/oauth2/authorization/${social}`);
    setLoginModal(true);
  };

  const onAppleButtonPress = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        console.log('애플로그인 성공!:', appleAuthRequestResponse);
        const {identityToken} = appleAuthRequestResponse;
        postAppleLogin(identityToken as string);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //
  async function onGoogleButtonPress() {
    try {
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const data = {
        name: userInfo.user.name,
        email: userInfo.user.email,
      };

      postLogin(data);
      auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log('onGoogleButtonPress ERROR', err);
    }
  }

  const goMain = useCallback(() => navigation.navigate('MainNavigator'), []);
  const goRegister = useCallback(() => navigation.navigate('Register'), []);
  return (
    <SafeAreaView style={styles.flex}>
      {/* 개발 단계시 홈과 가입으로 가는 버튼 */}
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
      </View> */}

      <View style={[styles.loginTitle]}>
        <Image
          source={require('../../assets/images/bob_place_login.png')}
          style={styles.titleImage}
        />
      </View>
      <View style={[styles.logoWrap]}>
        <Image source={require('../../assets/images/bobpool_login.png')} style={styles.logoImage} />
      </View>
      <SocialWebviewModal
        visible={loginModal}
        source={source}
        closeSocialModal={() => setLoginModal(false)}
      />
      <View style={[styles.loginButtonWrap]}>
        <TouchableOpacity onPress={() => signUpWithSNS('kakao')}>
          <Image
            style={[styles.iconButton]}
            source={require('../../assets/images/kakaoButton.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signUpWithSNS('naver')}>
          <Image
            style={[styles.iconButton]}
            source={require('../../assets/images/naverButton.png')}
          />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={onAppleButtonPress}>
            <Image
              style={[styles.iconButton]}
              source={require('../../assets/images/appleLogin.png')}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onGoogleButtonPress()}>
          <Image
            style={[styles.iconButton]}
            source={require('../../assets/images/GoogleLogin.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  loginTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  loginHeadText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 56,
    lineHeight: 65,
  },
  loginSubHeadText: {
    fontFamily: 'Pretendard-Light',
    color: '#616161',
    fontSize: 23,
  },
  logoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  titleImage: {
    width: wp(calWidth(344)),
    height: Platform.OS === 'ios' ? hp(calHeight(187, true)) : hp(calHeight(187)),
  },
  logoImage: {
    width: wp(calWidth(221)),
    height: Platform.OS === 'ios' ? hp(calHeight(150, true)) : hp(calHeight(150)),
  },
  loginButtonWrap: {
    marginBottom: 30,
    alignItems: 'center',
  },
  iconButton: {
    width: wp(calWidth(343)),
    height: Platform.OS === 'ios' ? hp(calHeight(44, true)) : hp(calHeight(44)),
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default Login;
