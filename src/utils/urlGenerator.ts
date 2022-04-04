export type UrlGenerator = (...args: (object | string | number)[]) => string;

export const getUrlGenerator = (baseUrl?: string) => (...args: (string | number | object)[]) => {
    const argsJoined = `${args
        .map(x => {
            if (typeof x === 'object')
                return null;

            return x;
        })
        .filter(x => !!x)
        .join('/')}`;

    const lastParam = args[args.length - 1];
    const hasQueryParams = typeof lastParam === 'object';
    const result = `${baseUrl || ''}/${argsJoined}`;

    if (hasQueryParams) {
        return `${result}?${new URLSearchParams(lastParam as Record<any, any>)}`;
    }

    return result;
};
