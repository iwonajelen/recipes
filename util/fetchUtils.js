export const fetcherGet = (url) => call_get(url).then((res) => res.json());
export const fetcherPost = (url, body) => call_post(url, body).then((res) => res.json());
export const fetcherDelete = (url) => call_delete(url).then((res) => res.json());

export const getHeaders = () => {
    return new Headers({
        'Content-Type': 'application/json'
    })
}

export const call_post = (url, body) => {
    return fetch(url, {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify(body)
    })
}

export const call_get = (url) => {
    return fetch(url, {
        headers: getHeaders()
    })
}

export const call_delete = (url) => {
    return fetch(url, {
        method: 'delete',
        headers: getHeaders()
    })
}