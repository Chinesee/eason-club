import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import { primary, secondary } from '@/config/style.config'
import { useNavigation } from '@react-navigation/native'
import { lightGray } from '@/config/style.config'
import SearchInput from '@comp/SearchInput'

import FlameIcon from '@icon/icon_flame.svg'

import { hotList, searchHistory, topic } from '@/mock-data'

export default ({ style }) => {
  const nav = useNavigation()

  const maxHeight = 90 // 搜索历史最大高度，超过将隐藏剩余记录
  const [isOpened, setIsOpened] = useState(true) // 搜索历史是否展开
  const [isSet, setIsSet] = useState(false) // 是否主动点击展开

  const onHistoryLayout = e => {
    const { height } = e.nativeEvent.layout
    if (height > maxHeight && !isSet) {
      setIsOpened(false)
    }
  }

  const css = StyleSheet.create({
    page: {
      height: '100%',
      backgroundColor: 'white',
    },
    inputWrapper: {
      height: 40,
      paddingHorizontal: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 40 / 2,
      backgroundColor: '#f4f4f4',
    },
    sec: {
      marginBottom: 15,
      paddingHorizontal: 15,
    },
    sec_title: {
      fontWeight: 'bold',
    },
    hot_list: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingVertical: 6,
      paddingHorizontal: 4,
    },
    hot_item: {
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingRight: 30,
    },
    hot_item_sort: {
      marginRight: 10,
      fontWeight: 'bold',
    },
    history_item: {
      marginRight: 10,
      marginBottom: 10,
      height: 35,
      paddingHorizontal: 10,
      justifyContent: 'center',
      backgroundColor: '#f6f6f6',
      borderRadius: 5,
    },
  })

  return (
    <SafeAreaView>
      <ScrollView
        style={css.page}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <View style={[style, css.inputWrapper]}>
            <SearchInput
              style={{ flex: 1 }}
              inputStyle={{ flex: 1, height: '100%' }}
              autoFocus={true}
              placeholderTextColor={lightGray}
              placeholder="搜一搜"
            />
          </View>
          <TouchableWithoutFeedback onPress={() => nav.goBack()}>
            <Text
              style={{
                zIndex: 100,
                marginLeft: 15,
                fontSize: 16,
                color: secondary,
              }}>
              取消
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={css.sec}>
          <Text style={css.sec_title}>热搜</Text>
          <View style={css.hot_list}>
            {hotList.map(({ content, isHot = false }, i) => (
              <TouchableWithoutFeedback key={i}>
                <View style={css.hot_item}>
                  <Text
                    style={[
                      css.hot_item_sort,
                      { color: i >= 4 ? secondary : null },
                    ]}>
                    {i + 1}
                  </Text>
                  <Text numberOfLines={1}>{content}</Text>
                  {isHot && <FlameIcon fill={primary} width={20} height={20} />}
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        <View style={css.sec}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[css.sec_title, { marginBottom: 10 }]}>搜索历史</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                setIsSet(true)
                setIsOpened(!isOpened)
              }}>
              <Text
                style={{ marginLeft: 'auto', fontSize: 11, color: secondary }}>
                {isOpened ? '收起' : '展开'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              maxHeight: isOpened ? null : maxHeight,
              flexDirection: 'row',
              flexWrap: 'wrap',
              overflow: 'hidden',
            }}
            onLayout={onHistoryLayout}>
            {searchHistory.map(({ content }, i) => (
              <TouchableWithoutFeedback key={i}>
                <View style={css.history_item}>
                  <Text numberOfLines={1}>{content}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        <View style={css.sec}>
          <Text style={[css.sec_title, { marginBottom: 10 }]}>近期话题</Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              overflow: 'hidden',
            }}
            onLayout={onHistoryLayout}>
            {topic.map(({ content }, i) => (
              <TouchableWithoutFeedback key={i}>
                <View style={css.history_item}>
                  <Text numberOfLines={1}>#{content}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
