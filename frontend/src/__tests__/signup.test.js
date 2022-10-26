import { render ,cleanup,act,fireEvent} from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from "../components/signup";
import renderer from 'react-test-renderer';
import  axiosInstance from "../axiosinstance"

beforeEach(()=>cleanup())

it("SignUp page rendered succesfully",()=>{
    const tree=renderer.create(<BrowserRouter><SignUp></SignUp></BrowserRouter>)
    expect(tree).toMatchSnapshot()
})

it("Handle submit working correctly",async ()=>{
    jest.spyOn(axiosInstance, 'post')
    axiosInstance.post = jest.fn(()=>Promise.resolve())
    await act(async () => 
    {
    const {getByText,getByTestId}=render(<BrowserRouter><SignUp></SignUp></BrowserRouter>)
    const inputFirstName = getByTestId("firstName",{target:{value:"longbo"}})
    const inputLastname = getByTestId("lastName",{target:{value:"kinley"}})
    const inputEmail = getByTestId("email",{target:{value:"abcd@gmail.com"}})
    const inputPassword = getByTestId("password",{target:{value:"abcdcom"}})
    const button=getByText("Sign Up")
    fireEvent.click(button)
    await expect(axiosInstance.post).toHaveBeenCalledTimes(1)
    
});
})