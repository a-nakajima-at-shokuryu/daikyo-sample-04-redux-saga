import React from 'react'
import { Provider } from 'react-redux'

// Componentをインポート
import Busho from '../components/Busho'

// Storeをインポート
import { setupStore } from '../stores/Busho'
const store = setupStore()

export default {
    title: '部署Select',
    component: Busho,
}

// ComponentをProviderでラップする
export const BushoStory = () =>
    <Provider store={store}>
        <Busho />
    </Provider>
