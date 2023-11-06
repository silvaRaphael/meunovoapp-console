export interface RequestOptionsI {
    token?: string;
}

export class HandleRequest {
    private response: Response = new Response();
    private error?: any;
    private data?: {};

    constructor(data?: {}) {
        this.data = data;
    }

    async get(url: string, option?: RequestOptionsI) {
        try {
            const response = await fetch(url, {
                method: "get",
                headers: new Headers({
                    Authorization: "Bearear " + option?.token,
                    "Content-Type": "application/json",
                }),
            });

            if (!response.ok) throw new Error(response.status.toString());

            this.response = await response.json();
        } catch (error: any) {
            this.error = error;
        }

        return {
            onDone: (fn: (response: Response) => any) => this.onDone(fn),
            onError: (fn: (error: any) => any) => this.onError(fn),
        };
    }

    async post(url: string, option?: RequestOptionsI) {
        try {
            if (!this.data) throw new Error("Data is not defined");

            const response = await fetch(url, {
                method: "post",
                headers: new Headers({
                    Authorization: "Bearear " + option?.token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(this.data),
            });

            if (!response.ok) throw new Error(response.status.toString());

            this.response = await response.json();
        } catch (error: any) {
            this.error = error;
        }

        return {
            onDone: (fn: (response: Response) => any) => this.onDone(fn),
            onError: (fn: (error: any) => any) => this.onError(fn),
        };
    }

    async put(url: string, option?: RequestOptionsI) {
        try {
            if (!this.data) throw new Error("Data is not defined");

            const response = await fetch(url, {
                method: "put",
                headers: new Headers({
                    Authorization: "Bearear " + option?.token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(this.data),
            });

            if (!response.ok) throw new Error(response.status.toString());

            this.response = await response.json();
        } catch (error: any) {
            this.error = error;
        }

        return {
            onDone: (fn: (response: Response) => any) => this.onDone(fn),
            onError: (fn: (error: any) => any) => this.onError(fn),
        };
    }

    async delete(url: string, option?: RequestOptionsI) {
        try {
            const response = await fetch(url, {
                method: "delete",
                headers: new Headers({
                    Authorization: "Bearear " + option?.token,
                    "Content-Type": "application/json",
                }),
            });

            if (!response.ok) throw new Error(response.status.toString());

            this.response = await response.json();
        } catch (error: any) {
            this.error = error;
        }

        return {
            onDone: (fn: (response: Response) => any) => this.onDone(fn),
            onError: (fn: (error: any) => any) => this.onError(fn),
        };
    }

    private onDone(fn: (response: Response) => any) {
        if (this.error) return;
        return fn(this.response);
    }

    private onError(fn: (error: any) => any) {
        if (!this.error) return;
        return fn(this.error);
    }
}
