import { API } from '@ultra-ui/api';

export default function handler(req, res) {
  const { method, body, headers } = req;
  if (method !== 'PATCH') {
    res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }
  const { authorization } = headers;
  const { id } = body;

  return API.request({
    baseURL: process.env.NEXT_API_DOMAIN,
    url: `/client/trip/request-cancel/${id}`,
    headers: { Authorization: authorization },
    method: 'PATCH'
  })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((e) => res.status(500).json(e));
}
