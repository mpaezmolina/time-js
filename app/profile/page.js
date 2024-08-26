// app/profile/page.js
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Profile() {
  const { user } = await getSession();
  const { accessToken } = await getAccessToken();
  console.log('accessToken :>> ', accessToken);

  return <div>Hello {user.name}</div>;
}, { returnTo: '/' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL