import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  RefreshControl,
  TouchableNativeFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Avatar from '@comp/Avatar'

import ArrowIcon from '@icon/icon_chevron.svg'

const followList = [
  { label: '账号资料' },
  { label: '安全隐私', divider: true },
  { label: '清理存储空间' },
  { label: '动态设置' },
  { label: '用户协议' },
  { label: '隐私策略', divider: true },
  { label: '退出登录', route: 'LoginWay' },
]

export default () => {
  const nav = useNavigation()
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingTop: 12 }}>
        <RefreshControl>
          {followList.map(({ label, divider, route = 'Home' }) => (
            <TouchableNativeFeedback
              key={label}
              onPress={() => nav.navigate(route)}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  marginBottom: divider ? 12 : 0,
                }}>
                <Avatar rounded={false} />
                <Text>{label}</Text>
                <ArrowIcon
                  width={20}
                  height={20}
                  style={{ marginLeft: 'auto' }}
                />
              </View>
            </TouchableNativeFeedback>
          ))}
        </RefreshControl>
      </ScrollView>
    </SafeAreaView>
  )
}