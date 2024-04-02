import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from './component/Table';

Enzyme.configure({ adapter: new Adapter() });

describe('Shallow Home page',()=>{

    it('Object check',()=>{
        let wrapper=shallow(<Table/>)
        // expect(data).toEqual
        console.log(wrapper);
    })
})