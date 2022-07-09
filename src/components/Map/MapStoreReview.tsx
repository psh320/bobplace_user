import React from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

type MapStoreReviewProps = {
  images: {uri: string; id: number}[] | [];
  name: string;
  date: string;
  rate: number;
  review: string;
  reply: {date: string; comment: string} | null;
  openPhotoModal: (imageSource: string) => void;
};

export const MapStoreReview: FC<MapStoreReviewProps> = ({
  images,
  name,
  date,
  rate,
  review,
  reply,
  openPhotoModal,
}) => {
  const renderedImage = (imagedata: {uri: string; id: number}[]) => {
    return (
      <View style={[styles.reviewRow3]}>
        {imagedata.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => openPhotoModal(item.uri)}>
              <View style={[styles.reviewImageWrap]} key={item.id}>
                <FastImage source={{uri: item.uri}} style={[styles.imageSize]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={[styles.reviewWrap]}>
      <View style={[styles.reviewRow1]}>
        <Text>{name}</Text>
        <Text>{date}</Text>
      </View>
      <View style={[styles.reviewRow2]}>
        <Icon name="star" size={18} color={'#FFDE69'} />
        <Text style={[styles.reviewRate]}>{rate}</Text>
      </View>
      <View style={[styles.reviewRow3]}>
        <Text style={[styles.reviewText]}>{review}</Text>
      </View>
      {renderedImage(images)}
      {reply !== null && (
        <View style={{width: '100%', marginTop: 12}}>
          <View style={{flexDirection: 'row', marginBottom: 8}}>
            <Text style={[styles.replyHeader]}>사장님 답글</Text>
            <Text style={[styles.replyDate]}>{reply.date}</Text>
          </View>
          <View style={[styles.replyComment]}>
            <Text style={[DesignSystem.body2Lt, DesignSystem.grey17]}>{reply.comment}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewListWrap: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  reviewWrap: {
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,
    paddingTop: 24,
  },
  reviewRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  reviewRow2: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  reviewRow3: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  reviewImageWrap: {marginRight: 8},
  reviewText: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  reviewRate: {
    fontFamily: 'Pretendard-Light',
    fontSize: 16,
    marginLeft: 4,
  },
  imageSize: {
    height: 80,
    width: 80,
  },
  replyHeader: {
    color: '#7D7D7D',
    marginRight: 8,
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    lineHeight: 14,
  },
  replyDate: {color: '#B7B7B7', fontFamily: 'Pretendard-Light', fontSize: 14, lineHeight: 14},
  replyComment: {
    borderColor: '#DFDFDF',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});