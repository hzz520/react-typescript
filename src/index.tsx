import React from "react"
import ReactDOM from "react-dom"
import {
    Provider
} from 'mobx-react'

import Routers from './router'
import stores from '@/store/index'

interface ObjectConstructor {
    assign<T, U>(target: T, source: U): T & U;
    assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
    assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    assign(target: any, ...sources: any[]): any;
}

ReactDOM.render(
    <Provider { ...stores }>
        <Routers/>
    </Provider>,
    document.getElementById("example")
)
