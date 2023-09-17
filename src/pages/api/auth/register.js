import { API } from '@ultra-ui/api';

export default function handler(req, res) {
  const { method, body } = req;
  if (method !== 'POST') {
    res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }
  return API.request({
    baseURL: process.env.NEXT_API_DOMAIN,
    url: '/client/user',
    params: { ...body, role: 'user', hasNotification: true, gender: true },
    method: 'POST'
  })
    .then((response) => res.status(200).json(response))
    .catch((e) => res.status(500).json(e));
}
