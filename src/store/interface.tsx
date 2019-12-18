import Common from './common'
import { RouteComponentProps } from 'react-router-dom'

export interface CommonProps extends RouteComponentProps<any> {
    common: Common
}