import * as Realm from "realm-web";
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function orderUpdate(req, res) {
  try {
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    let user;

    const credentials = Realm.Credentials.anonymous(req.body.accessToken)
    user = await app.logIn(credentials);
    // console.log(user)
    // let credentials;   
    // if(!app.currentUser) {
    //   credentials = Realm.Credentials.anonymous();
    //   user = await app.logIn(credentials);
    // }
    // const credentials = Realm.Credentials.jwt(user.accessToken);
    // user = await app.logIn(credentials);

    if(req.body.user_id !== '') {
      const {accessToken} = await getAccessToken(req, res);
      const credentials = Realm.Credentials.jwt(accessToken);
      user = await app.logIn(credentials);
    } 
    const update = await user.functions.updateOrder({...req.body, realm_id: user.id});
    res.status(200).json(update)
  } catch (error) {
    console.error(error);
    res.status(401)
  }
}
