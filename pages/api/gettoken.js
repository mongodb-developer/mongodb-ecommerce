import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function getToken(req, res) {
  try {
    const {accessToken} = await getAccessToken(req, res);
    res.status(200).json({accessToken})
  } catch (error) {
    console.error(error);
    res.status(401)
  }
}
