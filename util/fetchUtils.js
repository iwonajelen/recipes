export const fetcherGet = (url) => callGet(url).then((res) => res.json());
export const fetcherPost = (url, body) => callPost(url, body).then((res) => res.json());
export const fetcherDelete = (url) => callDdelete(url).then((res) => res.json());
export const fetcherUpdate = (url, body) => callPut(url, body).then((res) => res.json());

export const getHeaders = () => {
    return new Headers({
        'Content-Type': 'application/json'
    })
}

export const callPost = (url, body) => {
    return fetch(url, {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify(body)
    })
}

export const callGet = (url) => {
    return fetch(url, {
        headers: getHeaders()
    })
}

export const callDelete = (url) => {
    return fetch(url, {
        method: 'delete',
        headers: getHeaders()
    })
}

export const callPut = (url, body) => {
    return fetch(url, {
        method: 'put',
        headers: getHeaders(),
        body: JSON.stringify(body)
    })
}