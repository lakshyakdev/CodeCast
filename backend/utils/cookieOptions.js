const cookieOptions = {
    expires : Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly : true,
    secure : true,
}

export default cookieOptions;