import React, { Component } from 'react'

import {
    Hello
} from '../../components/hello'

export default class Index extends Component {
    constructor (props: any) {
        super(props)
    }
    state: {
        compiler: string
        framework: string,
        a: number
    } = {
        compiler: 'typescript',
        framework: 'react',
        a: 0
    }
    componentDidMount() {
        let map = new Map()
        map.set(2, 3)
        map.set(1, 2)
        console.log(map, map.has(0), map.size, Array.from(map.values()))
        this.setState({a: 1}, () => { 
            console.log(this.state.a) 
        })
        console.log(this.state.a)
        this.setState({a: 2}, () => { 
            console.log(this.state.a) 
        })
        console.log(this.state.a)
        this.setState({a: 3}, () => { 
            console.log(this.state.a) 
        })
        console.log(this.state.a)

        setTimeout(() => {
            this.setState({a: 5}, () => { 
                console.log(this.state.a) 
            })
            console.log(this.state.a)
            this.setState({a: 6}, () => { 
                console.log(this.state.a) 
            })
            console.log(this.state.a)
            this.setState({a: 7}, () => { 
                console.log(this.state.a) 
            })
            console.log(this.state.a)
        }, 0)
    }
    componentWillUpdate () {
        console.log('Index componentWillUpdate')
        return true
    }
    handleClick = () => {
        this.setState({
            framework: '' + Math.floor(Math.random() * 1000)
        })
    }
    render () {
        let {
            compiler,
            framework
        } = this.state
        return (
            <div className='index'>
                首页
                <div className='index-modify' onClick={ this.handleClick }>
                    修改
                </div>
                <Hello compiler={ compiler } framework={framework}/>
            </div>
        )
    }
}