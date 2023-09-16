import { getIronSession } from "iron-session/edge";
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const res = NextResponse.next();

    const session = await getIronSession(request, res, {
        cookieName: process.env.NEXT_PUBLIC_COOKIE_KEY,
        password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD,
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    })

    const {user} = session
    
    if(!user && request.url != '/login') {
        return NextResponse.rewrite(new URL('/login', request.url))
    
    } else {
        if(user) {
            if(request.url == `${process.env.NEXT_PUBLIC_WEB_URL}/login`) {
                return NextResponse.rewrite(new URL('/', request.url))
            } else {
                console.log(request.url)
                return NextResponse.rewrite(request.url)
            }
        } else {
            return NextResponse.redirect(request.url)

        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/data-acuview', '/about', '/login'],
}