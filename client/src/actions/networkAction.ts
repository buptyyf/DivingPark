export interface NetworkBaseModal {
    url: string,
    method?: string
}

const config = {
    baseUrl: 'http://127.0.0.1:2345'
}
export abstract class NetworkAction<ParamType, ResultType> {

    protected async promiseNetwork(baseData: NetworkBaseModal, paramData = {}) {
        return new Promise<Models.Base.WebBaseStruct<ResultType>>(async (resolve, reject) => {
            try {
                let params = paramData;
                // console.log(params);
                const input = this.param(params);
                console.log(input);
                const method = (baseData.method || 'GET').toUpperCase();
                const useBody = method === 'POST' || method === 'PUT';
                let url = `${config.baseUrl}` +
                    (config.baseUrl.endsWith('/') ? '' : '/') +
                    `${baseData.url}`;
                useBody || (url = this.appendQuery(url, input));
                console.log(url);
                let res = await this.networkReq(baseData.url, {
                    method: method,
                    // headers: {
                    //     'Content-Type': 'application/x-www-form-urlencoded'
                    // },
                    body: useBody ? input : null,
                    // credentials: 'include',
                    // credentials: 'same-origin'
                    // mode: 'no-cors'
                } as any)
                if(res.status < 200 || res.status > 299) {
                    throw new Error(res.status + '');
                }
                if(res) {
                    let data = await res.json();
                    resolve(data);
                } else {
                    resolve(null);
                }
                //console.log(data);
            } catch(error) {
                console.log(error);
                reject(error);
            }
        })
    }
    private param(query: any, scope = '') {
        let key
        let value
        let out = ''
        Object.keys(query).forEach((name) => {
            key = scope ? `${scope}[${name}]` : name
            value = query[name]
            if (value === undefined) return
            value === null && (value = '')
            if (typeof value === 'object') {
                out += this.param(value, key)
            } else {
                out += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            }
        })
        return scope ? out : out.substr(1)
    }

    private appendQuery(link: string, query: string) {
        return query ? (link + '&' + query).replace(/[&?]+/, '?') : link
    }

    private async networkReq(url: string | Request, init?: RequestInit): Promise<Response> {
        return fetch(url, init)
    }
}