import { createSlice } from '@reduxjs/toolkit'

// createSlice()でactionsとreducersを一気に生成
const BushoModule  = createSlice({
    name: "mydata",
    initialState: {
        label: '部署',
        value: '',
        options: [
            { id: '40', name: '営業所Ｃ', }, 
            { id: '50', name: '営業所Ｄ', }, 
            { id: '60', name: '営業所Ｅ', }, 
        ]
    },
    reducers: {
        changeBusho: (state, action) => {
            // 部署を変更（action.payloadの値をvalueにセット）
            // console.log(action.payload)
            return {
                ...state,
                value: action.payload
            }
        },
        changeLabel: (state, action) => {
            // ラベルを変更（末尾にaction.payloadの値を付加）
            return {
                ...state,
                label: state.label + action.payload
            }
        },
        createOptions: (state, action) => {
            // 選択肢を変更＆valueをクリア
            return {
                ...state,
                options: action.payload,
                value: ''
            }
        },
    }
})

export default BushoModule
