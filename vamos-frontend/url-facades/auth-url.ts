export const login_done_redir_key = 'done_redir';


function getUrlParam(name: string, def?: string|null) {
    return new URLSearchParams(window.location.search).get(name) ?? def;
}

function getIdentityLoginUrlWithRedirect(provider: string, redirect: string) {
    const redir = encodeURIComponent(redirect);
    let url = `/.auth/login/${provider}?post_login_redirect_url=${redir}`;
    if (provider === 'google') {
        url += "&access_type=offline";
    }
    return url;
}

export function getIdentityLoginUrl(provider: string) {
    const uri = getUrlParam(login_done_redir_key, '/' + window.location.search);
    return getIdentityLoginUrlWithRedirect(provider, uri);
}