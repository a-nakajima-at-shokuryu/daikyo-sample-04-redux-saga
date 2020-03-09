import { put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import BushoModule from '../modules/Busho'

// ワーカーSaga: CHANGE_LABEL Action によって起動する
function* changeLabel(action) {
    // 1秒待つ
    yield delay(100)
    // BushoModuleのreducersで定義してあるchangeLabelを実行（括弧内はpayload値）
    yield put(BushoModule.actions.changeLabel(action.payload))
}

// ワーカーSaga: CHANGE_BUSHO Action によって起動する
function* changeBusho(action) {
    // 1秒待つ
    yield delay(100)
    // BushoModuleのreducersで定義してあるchangeBushoを実行（括弧内はpayload値）
    yield put(BushoModule.actions.changeBusho(action.payload))
}

// ワーカーSaga: CREATE_OPTIONS Action によって起動する
function* createOptions(action) {
    // 1秒待つ
    yield delay(100)
    // BushoModuleのreducersで定義してあるcreateOptionsを実行（括弧内はpayload値）
    yield put(BushoModule.actions.createOptions(action.payload))
}

function* BushoSaga() {

    // CHANGE_LABEL Action が送出されるたびに changeLabel
    // を起動する
    // ユーザ情報の並列取得にも対応している
    // （連続で呼び出すとその数だけ実行される）
    yield takeEvery("CHANGE_LABEL", changeLabel)
    yield takeEvery("CHANGE_BUSHO", changeBusho)
    yield takeEvery("CREATE_OPTIONS", createOptions)
  
    // 代わりにtakeLatestを使うことも可能
    // しかし、ユーザ情報の並列取得には対応していない
    // もしレスポンス待ちの状態でアクションを受け取った場合、
    // 待ち状態のリクエストはキャンセルされて最後の1つだけが実行される
    // （連続で呼び出すと最後の１回だけ実行される）
    // yield takeLatest("CHANGE_LABEL", changeLabel)
    // yield takeLatest("CHANGE_BUSHO", changeBusho)
    // yield takeLatest("CREATE_OPTIONS", createOptions)
  
}
  
export default BushoSaga
  