export const getOAuthRedirectUri = (): string =>
    process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI || window.location.origin;
