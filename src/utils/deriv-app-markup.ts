const configuredMarkup = Number(process.env.NEXT_PUBLIC_DERIV_APP_MARKUP_PERCENTAGE ?? '3');

export const DERIV_APP_MARKUP_PERCENTAGE = Number.isFinite(configuredMarkup) ? configuredMarkup : 3;
