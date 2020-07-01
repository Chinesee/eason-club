import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import SearchIcon from '@/assets/icon/icon_search.svg'
import { primary, secondary } from '@/config/style.config'
import { useNavigation } from '@react-navigation/native'
import { hotList, searchHistory, lightGray } from '@/mock-data/search'
import FlameIcon from '@icon/icon_flame.svg'

export default ({ style }) => {
  const nav = useNavigation()

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
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#f6f6f6',
      borderRadius: 5,
    },
  })

  return (
    <View style={css.page}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <View style={{ ...style, ...css.inputWrapper }}>
          <SearchIcon width={20} height={20} />
          <TextInput
            style={{ flex: 1, height: '100%' }}
            placeholder="搜一搜"
            selectionColor={secondary}
            autoFocus={true}
            maxLength={50}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => nav.goBack()}>
          <Text style={{ marginLeft: 15, fontSize: 16, color: secondary }}>
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
                  style={{
                    ...css.hot_item_sort,
                    color: i >= 4 ? secondary : null,
                  }}>
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
        <Text style={{ ...css.sec_title, marginBottom: 10 }}>搜索历史</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {searchHistory.map(({ content }, i) => (
            <TouchableWithoutFeedback key={i}>
              <View style={css.history_item}>
                <Text numberOfLines={1}>{content}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </View>
  )
}