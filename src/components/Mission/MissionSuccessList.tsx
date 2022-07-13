import React from 'react';
import {View, FlatList} from 'react-native';
import {MissionSuccessfulCard} from './MissionSuccessfulCard';
import {useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getMissionsComplete} from '../../api/mission';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {IMissionSuccess} from '../../data';

interface dayofweekType {
  [index: string]: string;
  MONDAY: string;
  TUESDAY: string;
  WEDNESDAY: string;
  THURSDAY: string;
  FRIDAY: string;
  SATURDAY: string;
  SUNDAY: string;
}

export const MissionSuccessList = () => {
  const DataMissionsComplete = useQuery<IMissionSuccess[]>(
    queryKey.MISSIONSCOMPLETE,
    getMissionsComplete,
  );
  // console.log('DataMissionsComplete: ', DataMissionsComplete.data);//DataMissionsComplete.data.~

  //prettier-ignore
  const DAYOFWEEK: dayofweekType = {
    'MONDAY': '월', 'TUESDAY': '화', 'WEDNESDAY': '수', 'THURSDAY': '목', 'FRIDAY': '금', 'SATURDAY': '토', 'SUNDAY': '일',
  };

  return (
    <FlatList
      style={{marginTop: hp(calHeight(16))}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: hp(calHeight(16)),
        backgroundColor: '#F6F6FA',
        paddingBottom: hp(calHeight(50)),
      }}
      scrollEventThrottle={10}
      data={DataMissionsComplete.data}
      renderItem={({item}) => (
        <>
          <MissionSuccessfulCard
            dayOfWeek={DAYOFWEEK[item.dayOfWeek]}
            // dayOfWeek={item.dayOfWeek}
            mission={item.mission}
            missionId={item.missionId}
            point={item.point}
            storeCategory={item.storeCategory}
            storeId={item.storeId}
            storeName={item.storeName}
            successDate={item.successDate}
            reviewStatus={item.reviewStatus}
          />
        </>
      )}
      ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
    />
  );
};
