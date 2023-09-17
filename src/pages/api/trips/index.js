import { API } from '@ultra-ui/api';

export default function handler(req, res) {
  const { method, body, headers } = req;
  if (method !== 'POST') {
    res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }
  const { authorization } = headers;

  return API.request({
    baseURL: process.env.NEXT_API_DOMAIN,
    url: '/client/trip',
    params: body,
    headers: { Authorization: authorization },
    method: 'POST'
  })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((e) => res.status(500).json(e));
}
