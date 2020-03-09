import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import BushoModule from '../modules/Busho'
import BushoSaga from '../sagas/Busho'

// Sagaミドルウェアを作成する
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()

// myReducerの準備
const myReducer = combineReducers({
    mydata: BushoModule.reducer
})

// setup関数を用意してエクスポートする
export const setupStore = () => {
    const middlewares = [...getDefaultMiddleware(), sagaMiddleware];

    const store = configureStore({
        reducer: myReducer,
        middleware: middlewares,
    })

    // Sagaを起動する
    sagaMiddleware.run(BushoSaga)

    return store
}
