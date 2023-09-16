import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function handler (req,res)  {
    if(req.method === 'POST')  {
        req.session.destroy();
        const response = {
            data: {
                success: true
            }
        }
        res.status(200).json({message: "Logout Successfully", data: response})
    } else {
        res.status(400).json({message: "Invalid Method"})
    }
}, {
    cookieName: process.env.NEXT_PUBLIC_COOKIE_KEY,
    password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
}
)
