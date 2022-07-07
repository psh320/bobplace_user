import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DesignSystem} from '../assets/DesignSystem';
import {MissionCard} from '../components';
import {MissionProcess} from '../components/MissionProcess';
import {MissionProgressSwitch} from '../components/MissionProgressSwitch';
import {MissionSuccessList} from '../components/MissionSuccessList';
import {MissionUser} from '../components/MissionUser';
import {MissionNo} from '../components/MissionNo';
import {customAxios} from '../api/customAxios';
import {useRecoilValue} from 'recoil';
import {userToken} from '../state';

interface DataResponse {
  mission: string;
  missionId: number;
  missionStatus: string; //NEW, PROGRESS, OWNER_CHECK
  point: number;
  storeCategory: string;
  storeName: string;
}
//"NEW","PROGRESS" :'진행중' processCircle  // "OWNER_CHECK" : '도전 성공' processCircle

const Mission = () => {
  const token = useRecoilValue(userToken);
  const [status, setStatus] = useState<string>('PROGRESS'); //버튼문구 //"NEW","PROGRESS","OWNER_CHECK" //서버연결후삭제
  const [progressnow, setProgressnow] = useState(0); //아래 스위치. 0:진행중 / 1:진행완료
  const [noMission, setNoMission] = useState(false); //미션이없는상태면 true
  //서버연결후 아래에 var noMission

  const [Data, setData] = useState<DataResponse[]>([]);
  const getMissionsMeProgress = async () => {
    const res = await customAxios(token).get('missions/me/progress');
    console.log('getMissionsMeProgress res.data : ', res.data);
    setData(res.data.result);
    console.log('데이타저장? :', Data);
    // Data.length로할지, typeof(Data);
    // var noMission = useState(Data.length === 0); //미션이없는상태면 true
    // var 스코프 호출되는지 확인
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F6F6FA'}]}>
        <View style={[styles.headerWrap]}>
          <View style={[styles.header]}>
            <Text style={[DesignSystem.h2SB, {color: 'black'}]}>미션</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          {progressnow === 0 ? (
            noMission ? (
              <MissionNo progressnow={progressnow} /> //미션없는화면
            ) : (
              <View>
                <MissionProcess status={status} />
                <MissionUser username={'밥풀이'} userid={123} status={status} />
                <MissionCard
                  mission={'10000원 이상'}
                  missionId={1}
                  missionStatus={status}
                  point={500}
                  storeCategory={'중국집'}
                  storeName={'짱맛집'}
                  // mission={Data.mission}
                  // missionId={Data.missionId}
                  // missionStatus={Data.missionStatus}
                  // point={Data.poin}
                  // storeCategory={Data.storeCategory}
                  // storeName={Data.storeName}
                />
              </View>
            )
          ) : noMission ? (
            <MissionNo progressnow={progressnow} /> //미션없는화면
          ) : (
            <MissionSuccessList />
          )}
        </View>
        <MissionProgressSwitch progressnow={progressnow} setProgressnow={setProgressnow} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  headerWrap: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#FFFFFF',
    marginLeft: 16,
  },
});

export default Mission;
