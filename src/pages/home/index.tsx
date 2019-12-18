import React, { Component } from 'react'
import {
    inject,
    observer
} from 'mobx-react'

import {
    Hello
} from '@/components/hello' 

import {
    CommonProps
} from '@/store/interface'

@inject('common')
@observer
export default class Home extends Component<CommonProps, {}> {
    componentWillUpdate () {
        console.log('Home componentWillUpdate')
        return true
    }
    handleChange = () => {
        this.props.common.setDemoTest()
    }
    render () {
        return (
            <div className='home'>
                home页
                <div onClick={ this.handleChange }>修改</div>
                <Hello { ...this.props.common.demo } />
            </div>
        )
    }
}