// app/profile/page.js
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getLines } from '../dao';

export default withPageAuthRequired(async function Lines() {
	const { accessToken } = await getAccessToken();
	const lines = await getLines(accessToken);

  return (
    <div>
      {lines.map(line => (
        <div key={line.id}>
          <h3>{line.id}</h3>
          <p>Name: {line.name}</p>
        </div>
      ))}
    </div>
  );
}, { returnTo: '/lines' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL