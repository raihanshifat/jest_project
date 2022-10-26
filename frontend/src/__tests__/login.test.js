import { render,cleanup, fireEvent ,act} from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import  axiosInstance from "../axiosinstance"
import axios from 'axios';

// jest.mock("axios")

// axios.create.post =jest.fn(() => Promise.resolve())
// axios.create.interceptors.response.use=jest.fn()
 
// jest.mock('axios', () => {
//     return {
//       create: jest.fn(() => ({
//         post: jest.fn(() => Promise.resolve()),
        // interceptors: {
        //   request: { use: jest.fn(), eject: jest.fn() },
        //   response: { use: jest.fn(), eject: jest.fn() }
        // }
//       }))
//     }
//   })


import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from "../components/login";
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme'

Enzyme.configure({ adapter: new Adapter() });

beforeEach(()=>cleanup())

it("Login page rendered succesfully",()=>{
    const tree=renderer.create(<BrowserRouter><SignIn></SignIn></BrowserRouter>)
    expect(tree).toMatchSnapshot()
})

it("Handle submit working correctly",async ()=>{
    jest.spyOn(axiosInstance, 'post')
    axiosInstance.post = jest.fn(()=>Promise.resolve())
    // const mockObj=jest.spyOn(axios,'post').mockResolvedValue(Promise.resolve())
    // jest.mock('axios', () => {
    //     return {
    //       post: jest.fn()
    //     };
    //   });
    // axiosInstance=jest.fn().mockImplementation(()=>20)
    // const resp = { data: [{ name: 'FooBar' }]};
    // axios.post.mockImplementation(() => Promise.resolve(resp)); 
    
    // axios.create.post = jest.fn()
    // axios.post.mockImplementationOnce(() => Promise.resolve(mockData));
    // const {getByText,getByTestId}=render(<BrowserRouter><SignIn></SignIn></BrowserRouter>)
    await act(async () => 
    {
    const {getByText,getByTestId}=render(<BrowserRouter><SignIn></SignIn></BrowserRouter>)
    const inputEmail = getByTestId("email",{target:{value:"abcd@gmail.com"}})
    const inputPassword = getByTestId("password",{target:{value:"abcdcom"}})
    const button=getByText("Sign In")
    fireEvent.click(button)
    await expect(axiosInstance.post).toHaveBeenCalledTimes(1)
    
});
    // const inputEmail = getByTestId("email",{target:{value:"abcd@gmail.com"}})
    // const inputPassword = getByTestId("password",{target:{value:"abcdcom"}})
    // const button=getByText("Sign In")
    // fireEvent.click(button)
    
    // form.simulate("submit")
    // expect(form.length).toBe(1)
    // await expect(axiosInstance.post).toHaveBeenCalledTimes(1)
    // await waitFor(()=>expect(axios.post).toBeCalled())
})