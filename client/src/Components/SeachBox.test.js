import React from 'react';
import { mount } from 'enzyme';
import SearchBox from "./SeachBox";

let wrapper;
const fetchNewsMock = jest.fn();

beforeEach(()=>{
  wrapper =  mount(<SearchBox fetchNews={fetchNewsMock} />);
})

afterEach(()=>{
  wrapper.unmount()
})

it('renders as expected', () => {
  expect(wrapper).toMatchSnapshot();
});

it('calls fetchNews function on form submit', () => {
  wrapper.setState({ term: 'Sunday' });
  wrapper.find('form').simulate('submit')

  expect(fetchNewsMock).toBeCalledWith('/news/filtered?query=Sunday');
});