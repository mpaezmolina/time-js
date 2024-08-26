
//----  LINES

export async function getLines(access_token) {
	const query = `
		query {
  			lines {
				id
    			name
  			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data.lines;
}

export async function removeLine(id, access_token) {
	const query = `
		mutation {
			delete_lines_by_pk(id: ${id})
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data;
}

export async function saveLine(name, access_token) {
	const query = `
		mutation {
			insert_lines(objects: {name: "${name}"}) {
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
		const response = await fetch(process.env.HASURA_ENDPOINT, {
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
