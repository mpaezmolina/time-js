'use client';

import { useState, useEffect } from 'react';
import AddLineForm from './add-line-form';
import { getLines, removeLine } from '../app/dao';
import { decodeJWT } from "../utils/decodeJWT";

export default function LinesContainer({ accessToken }) {
  const [lines, setLines] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const linesData = await getLines(accessToken);
      const decodedToken = decodeJWT(accessToken);
      const userId = decodedToken.payload['https://hasura.io/jwt/claims']['x-hasura-user-id'];
      setLines(linesData);
      setUserId(userId);
    };

    fetchData();
  }, [accessToken]);

  const handleLineAdded = async () => {
    const linesData = await getLines(accessToken);
    setLines(linesData);
  };

  const handleDelete = async (lineId) => {    
      await removeLine(lineId, accessToken);
      const updatedLines = lines.filter(line => line.id !== lineId);
      setLines(updatedLines);    
  };

  const nonUserLines = lines.filter(line => line.operator_id !== userId);
  const userLines = lines.filter(line => line.operator_id === userId);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available lines</h2>
      <table className="divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {nonUserLines.length === 0 ? (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-gray-500">No lines available.</td>
            </tr>
          ) : (
            nonUserLines.map(line => (
              <tr key={line.id}>
                <td className="px-6 py-4 text-gray-500">{line.id}</td>
                <td className="px-6 py-4 text-gray-500">{line.name}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-green-500 hover:text-green-700"
                  > Join
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <br />

      <h2 className="text-2xl font-bold mb-4">Your Lines</h2>
      <table className="divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userLines.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">You have no lines.</td>
            </tr>
          ) : (
            userLines.map(line => (
              <tr key={line.id}>
                <td className="px-6 py-4 text-gray-500">{line.id}</td>
                <td className="px-6 py-4 text-gray-500">{line.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(line.id)}
                    className="text-red-500 hover:text-red-700"
                  > Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <br />

      <AddLineForm accessToken={accessToken} onLineAdded={handleLineAdded} />
    </div>
  );
}
