import { getAuthInfo } from '@/external/deriv-core';

export type MarkupStatistics = {
    data: {
        total_app_markup_usd: number;
        total_volume_usd: number;
        total_payout_usd: number;
        total_contract_count: number;
        total_client_count: number;
        breakdown: Array<Record<string, unknown>>;
    };
    meta: {
        endpoint: string;
        method: string;
        timing: number;
    };
};

export async function fetchMarkupStatistics(dateFrom: string, dateTo: string): Promise<MarkupStatistics> {
    const authInfo = getAuthInfo();
    if (!authInfo?.access_token) throw new Error('Deriv authentication is required');

    const params = new URLSearchParams({ date_from: dateFrom, date_to: dateTo });
    const response = await fetch(`/api/markup-statistics?${params.toString()}`, {
        headers: { Authorization: `Bearer ${authInfo.access_token}` },
    });
    const body = await response.json();

    if (!response.ok) throw new Error(body?.error ?? 'Unable to load markup statistics');
    return body as MarkupStatistics;
}
