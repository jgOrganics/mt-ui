import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from './component/Table';
import { ThemeProvider } from '@material-ui/styles';

Enzyme.configure({ adapter: new Adapter() });

describe('Shallow Home page',()=>{

    it('Object check',()=>{
        let wrapper=shallow(<ThemeProvider/>)
        // expect(data).toEqual
        console.log(wrapper);
    })
})