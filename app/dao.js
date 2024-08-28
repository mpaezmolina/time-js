import { decodeJWT } from "../utils/decodeJWT"

//----  LINES

export async function getLines(access_token) {
	const query = `
		query {
  			lines {
				id
    			name
				operator_id
  			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data.lines;
}

export async function removeLine(id, access_token) {
	console.log("LINE ID: " + id);
	const query = `
		mutation {
			delete_lines_by_pk(id: ${id}) {
				id
			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data;
}

export async function saveLine(name, access_token) {
	const decodedToken = decodeJWT(access_token);
    const userId = decodedToken.payload['https://hasura.io/jwt/claims']['x-hasura-user-id'];

	const query = `
		mutation {
			insert_lines(objects: {name: "${name}", operator_id: "${userId}"}) {
				returning {
					id
				}
			}
		}
    `;

	const response = await fetchHasura(query, access_token);
	return await response;
}

//---- HASURA

async function fetchHasura(query, access_token) {
	try {
		const response = await fetch("https://time.hasura.app/v1/graphql", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
			body: JSON.stringify({
				query,
			}),
		});

		const data = await response.json();

		if (data.errors) {
			console.log(data.errors);
		}
		return data;
	} catch (error) {
		console.log(error);
	}
}
