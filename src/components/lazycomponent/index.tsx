import Loadable from 'react-loadable'
import Loading from '../loading/index'

export default (ImportComponent: any) => {
  const LoadComponnent = Loadable({
    loader: ImportComponent,
    loading: Loading
  })

  return LoadComponnent
}
