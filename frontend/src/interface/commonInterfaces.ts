export interface ArticleType<X,Y,Z>{
    id:X,
    title:any,
    author:number,
    body:string,
    cover:Z,
    date:Y,
}

export interface UserType{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface CredentialType{
    email:string,
    password:string
}