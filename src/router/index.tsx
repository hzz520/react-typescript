import React from 'react'
import {
    withRouter,
    Switch,
    Route,
    BrowserRouter as Router,
    Link
} from 'react-router-dom'

import asyncComponent from '../components/lazycomponent'
import './index.less'

let {
    BASENAME
} = process.env

if (BASENAME === '.') {
    BASENAME = '/'
}

let routeArr = [
    {
      path: '/',
      pathName: 'index'
    },
    { 
      path: '/home',
      pathName: 'home'
    }
]

class Layout extends React.Component {
    render () {
        return (
            <div className="root">
                <div className='root-link-wrap'>
                    <Link className="root-link-item" to="/">首页</Link>
                    <Link className="root-link-item" to="/home">home页</Link>
                </div>
                {
                    this.props.children
                }
            </div>
        )
    }
}

const Load = (pathName: string) => asyncComponent(() => import(/* webpackChunkName: `[request]` */ `../pages/${pathName}/index.tsx`))

let Main = withRouter(props => <Layout {...props} />)

export default () => (
    <Router
        basename = 'h5'
    >
        <Main>
            <Switch>
                { 
                    routeArr.map(({ path, pathName }, i) => <Route key={i} exact path={path} component={Load(pathName)}/>)
                }
            </Switch>
        </Main>
    </Router>
)
