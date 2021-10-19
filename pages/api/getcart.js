import * as Realm from "realm-web";
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function getCart(req, res) {
  try {
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });

    let user = app.currentUser;
    let credentials;   
    if(!app.currentUser) {
      credentials = Realm.Credentials.anonymous();
      // user = await app.logIn(credentials);
      if(req.body.auth) {
        const {accessToken} = await getAccessToken(req, res);
        credentials = Realm.Credentials.jwt(accessToken);
      } 
      user = await app.logIn(credentials);
    }

    const cart = await user.functions.getCart();
    res.status(200).json(cart)
  } catch (error) {
    console.error(error);
    res.status(401)
  }
}
