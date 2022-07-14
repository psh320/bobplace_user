import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {MyReviewEach} from '../../components/My/MyReviewEach';
import {useInfiniteQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getReviewsMe} from '../../api';
import {PhotoModal} from '../../modal';
import {ReviewNo} from '../../components/ReviewNo';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = NativeStackScreenProps<MyStackParamList, 'MyReview'>;

export const MyReview = ({navigation}: Props) => {
  const [photoModal, setPhotoModal] = useState(false);
  const [reviewPhoto, setReviewPhoto] = useState<{uri: string}>({uri: 'string'});
  const openPhotoModal = (imageSource: string) => {
    setReviewPhoto({uri: imageSource});
    setPhotoModal(true);
  };
  const goBack = () => {
    navigation.goBack();
  };

  const DataReviews = useInfiniteQuery([queryKey.REVIEWSME], getReviewsMe, {
    getNextPageParam: (lastPage, pages) => {
      return pages.length;
    },
  });
  // console.log(DataReviews.data?.pages.length);

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'리뷰 관리'} />
        {DataReviews.data?.pages.length !== 0 ? ( //리뷰없는경우
          <View style={[DesignSystem.centerArrange, {flex: 1}]}>
            <ReviewNo isPhoto={0} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={true}
            scrollEventThrottle={10}
            data={DataReviews.data?.pages}
            onEndReached={() => {
              if (DataReviews.hasNextPage) {
                DataReviews.fetchNextPage();
              }
            }}
            renderItem={({item}) => (
              <>
                {item.content.map((e: any, i: number) => {
                  return (
                    <View key={i}>
                      <MyReviewEach
                        name={e.name}
                        date={e.date}
                        rate={e.rate}
                        content={e.content}
                        images={e.images}
                        reply={e.reply}
                        openPhotoModal={openPhotoModal}
                      />
                    </View>
                  );
                })}
              </>
            )}
          />
        )}
        <PhotoModal
          imageUri={reviewPhoto}
          visible={photoModal}
          closePhotoModal={() => setPhotoModal(false)}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});
