import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import LinesContainer from '../../components/lines-container';

export default withPageAuthRequired(async function LinesPage() {
	const { accessToken } = await getAccessToken();
  
  return (
    <LinesContainer accessToken={accessToken} />
  );
}, { returnTo: '/lines' })
