import * as React from "react"

export interface HelloProps { 
    compiler: string
    framework: string 
}

export interface HelloState {
    demo: string
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, HelloState> {
    componentWillReceiveProps () {
        console.log('Hello componentWillReceiveProps')
    }
    componentWillUpdate () {
        console.log('Hello componentWillUpdate')
        return true
    }
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
