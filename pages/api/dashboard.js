import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import * as Realm from "realm-web";

export default withApiAuthRequired(async function dashboard(req, res) {
  try {
    const {accessToken} = await getAccessToken(req, res);

    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.jwt(accessToken);
    const user = await app.logIn(credentials);
    const allProducts = await user.functions.getAllProducts();
    res.status(200).json(allProducts)
  } catch (error) {
    console.error(error);
    res.status(401)
  }
});
