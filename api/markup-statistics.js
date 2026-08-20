const APP_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID;
const DERIV_MARKUP_STATISTICS_URL = 'https://api.derivws.com/applications/v1/markup-statistics';

const isDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const authorization = req.headers.authorization;
    const { date_from, date_to } = req.query;

    if (!APP_ID) return res.status(500).json({ error: 'Deriv app ID is not configured' });
    if (!authorization?.startsWith('Bearer ')) return res.status(401).json({ error: 'Bearer authentication is required' });
    if (!isDate(date_from) || !isDate(date_to)) {
        return res.status(400).json({ error: 'date_from and date_to must use YYYY-MM-DD format' });
    }

    try {
        const url = new URL(DERIV_MARKUP_STATISTICS_URL);
        url.searchParams.set('date_from', date_from);
        url.searchParams.set('date_to', date_to);

        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                Authorization: authorization,
                'Deriv-App-ID': APP_ID,
            },
        });
        const body = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: body?.error ?? 'Deriv markup statistics request failed' });
        }

        return res.status(200).json(body);
    } catch {
        return res.status(502).json({ error: 'Unable to reach Deriv markup statistics' });
    }
}
