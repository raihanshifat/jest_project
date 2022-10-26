import {cleanup, fireEvent, render,screen } from '@testing-library/react';
import Home from '../components/home'
import renderer from 'react-test-renderer'
import {BrowserRouter as Router} from 'react-router-dom'
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });
beforeEach(()=>cleanup())

it("Home page snapshot testing when user is unauthorized",()=>{
    const tree=renderer.create(<Router><Home></Home></Router>).toJSON()
    expect(tree).toMatchSnapshot();
    
})

it("Home page testing when user authorized",()=>{
    React.useState=jest.fn().mockImplementation(()=>[[{id:1}],jest.fn()])
    render(<Router><Home></Home></Router>);
    expect(screen.getByText("logout")).toBeInTheDocument();
    
})