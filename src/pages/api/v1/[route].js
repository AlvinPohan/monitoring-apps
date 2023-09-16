import { api, apiToken } from "@/utils/api";
import { withIronSessionApiRoute } from "iron-session/next";
import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";

export default withIronSessionApiRoute(async function handler (req,res)  {
    const query = req.query;
    const {route, halaman} = query

    if(req.method === 'GET')  {
        try {
            const params = {}
            if(halaman) {
                params['halaman'] = halaman
            }
            // get access_token start
            const session = await getIronSession(req, NextResponse.next(), {
                cookieName: process.env.NEXT_PUBLIC_COOKIE_KEY,
                password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD,
                // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
                cookieOptions: {
                    secure: process.env.NODE_ENV === "production",
                },
            })

            const {user} = session

            var bearer = user?.token
            // get access_token end
            
            if(bearer) {
                const response = await api.get(`/${route}`, {
                    headers: {
                        Authorization: `Bearer ${bearer}`
                    },
                    params: params
                })
                res.status(200).json({message: "Success", data: JSON.parse(JSON.stringify(response.data))})
            }
        } catch (err) {
            res.status(400).json({message: err})
        }
    }

    else if(req.method == 'POST') {
        try {
            const response = await apiToken.post(`/${route}`, req.body)
            if(route == 'login.php' && response?.data?.accessToken) {
                req.session.user = {
                        token: response.data.accessToken
                }
                await req.session.save()
            }

            res.status(200).json({message: "Success", data: JSON.parse(JSON.stringify(response?.data))})

        } catch (err) {
            res.status(400).json({message: "Error"})
        }
    } else {
        res.status(404).json({message: "Invalid Method"})
    }
},
{
    cookieName: process.env.NEXT_PUBLIC_COOKIE_KEY,
    password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD,
    ttl: process.env.NEXT_PUBLIC_COOKIE_EXPIRED,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
}
)

