import React from 'react'
import { SafeAreaView } from 'react-native'

import EmptyData from '@comp/EmptyData'
import RefreshView from '@comp/RefreshView'

export default () => {
  return (
    <SafeAreaView>
      <RefreshView>
        <EmptyData />
      </RefreshView>
    </SafeAreaView>
  )
}
