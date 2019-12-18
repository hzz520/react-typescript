import {
    observable,
    action
} from 'mobx'

export interface DemoProps {
    compiler: string
    framework: string
}

export type SetDemoTestOpts<S=any> = () => S

export default class Common {
    @observable demo: DemoProps = {
        compiler: 'Typescript',
        framework: 'React'
    }

    @action setDemoTest:SetDemoTestOpts = async () => {
        this.demo.framework = this.demo.framework === 'React' ? 'Vue' : 'React'
    }
}