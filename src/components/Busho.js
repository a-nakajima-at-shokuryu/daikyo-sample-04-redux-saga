import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const Busho = () => {

    // dispatchの取得
    const dispatch = useDispatch()
            
    // stateの取得
    const labelName = useSelector(state => state.mydata.label)
    const value = useSelector(state => state.mydata.value)
    const options = useSelector(state => state.mydata.options)
    const listItem = options.map(
        (e) => {
            return <MenuItem value={e.id}>{e.id} - {e.name}</MenuItem>
        }
    )

    // 「選択肢生成」ボタンをクリックした時に生成する選択肢の配列
    const myNewValue = [
        { id: '10', name: '営業所Ｆ', }, 
        { id: '20', name: '営業所Ｇ', }, 
        { id: '30', name: '営業所Ｈ', }, 
    ]

    // actionの取得
    // mySagaで定義してあるtypeを指定する
    // ここでpayloadを与えることもできる
    const changeBusho = (e) => dispatch({type: 'CHANGE_BUSHO', payload: e.target.value})
    const changeLabel = () => dispatch({type: 'CHANGE_LABEL', payload: '*'})
    const createOptions = () => dispatch({type: 'CREATE_OPTIONS', payload: myNewValue})
    const initOptions = () => dispatch({type: 'CREATE_OPTIONS', payload: []})

    // メッセージボックス表示
    const showMessageHandler = (e) => {
        const msg = 
            "ラベルの値: " + labelName + "\n" +
            "選択肢の値：" + JSON.stringify(options) + "\n" +
            "選択中の値：" + value
        window.alert(msg)
    }

    const getJsonHandler = () => {

        // 非同期処理
        const axios = require('axios')
        axios.get('http://localhost:8080/busho', {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            responseType: 'json',
        }).then((res) => {
            console.log(res.data)
            const myJsonData = res.data
            const createOptions = () => dispatch({type: 'CREATE_OPTIONS', payload: myJsonData})
            createOptions()
        }).catch((err) => {
            console.log('error!')
            console.log(err.status)
        })

    }

    return (
        <div>
            <div>
                <InputLabel shrink id="busho-label">{labelName}</InputLabel>
                <Select labelId="busho-label" value={value} onChange={changeBusho}>
                    {listItem}
                </Select>
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={changeLabel}>ラベル変更</Button>&nbsp;
                <Button variant="contained" color="primary" onClick={createOptions}>選択肢生成</Button>&nbsp;
                <Button variant="contained" color="primary" onClick={initOptions}>選択肢初期化</Button>&nbsp;
                <Button variant="contained" color="primary" onClick={showMessageHandler}>値表示</Button>&nbsp;
                <Button variant="contained" color="secondary" onClick={getJsonHandler}>非同期で取得</Button>&nbsp;
            </div>
        </div>
    )
  
}
  
export default Busho
  