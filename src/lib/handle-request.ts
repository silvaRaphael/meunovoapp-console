import { Language } from "../components/shared/language-provider";
import { BASE_API } from "config/constants";

export interface IRequestOptions {
    language?: Language;
}

export class HandleRequest {
    private response: Response = new Response();
    private error?: any;
    private data?: {};

    constructor(data?: {}) {
        this.data = data;
    }

    async get(url: string, option?: IRequestOptions) {
        try {
            const response = await fetch(`${BASE_API}${url}`, {
                method: "get",
                credentials: "include",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Content-Language": option?.language?.locale ?? "",
                }),
            });

            if (!response.ok) throw await response.json();

            this.response = response.headers.get("Content-Type")?.includes("application/json")
                ? await response.json()
                : null;
        } catch (error: any) {
            this.error = error;
        }

        return {
            onDone: (fn: (response: any) => any) => this.onDone(fn),
            onError: (fn: (error: { error: { message: string }[]; redirect?: string }) => any) => this.onError(fn),
        };
    }

    async post(url: string, option?: IRequestOptions) {
        try {
            if (!this.data) throw new Error("Data is not defined");

            const response = await fetch(`${BASE_API}${url}`, {
                method: "post",
                credentials: "include",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Content-Language": option?.language?.locale ?? "",
                }),
                body: JSON.stringify(this.data),
            });

            if (!response.ok) throw await response.json();

            this.response = response.headers.get("Content-Type")?.includes("application/json")
                ? await response.json()
                : null;
        } catch (error: any) {
            this.error = error;
        }

        return {
            onDone: (fn: (response: any) => any) => this.onDone(fn),
            onError: (fn: (error: { error: { message: string }[]; redirect?: string }) => any) => this.onError(fn),
        };
    }

    async put(url: string, option?: IRequestOptions) {
        try {
            if (!this.data) throw new Error("Data is not defined");

            const response = await fetch(`${BASE_API}${url}`, {
                method: "put",
                credentials: "include",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Content-Language": option?.language?.locale ?? "",
                }),
                body: JSON.stringify(this.data),
            });

            if (!response.ok) throw await response.json();

            this.response = response.headers.get("Content-Type")?.includes("application/json")
                ? await response.json()
                : null;
        } catch (error: any) {
            this.error = error;
        }

        return {
            onDone: (fn: (response: any) => any) => this.onDone(fn),
            onError: (fn: (error: { error: { message: string }[]; redirect?: string }) => any) => this.onError(fn),
        };
    }

    async delete(url: string, option?: IRequestOptions) {
        try {
            const response = await fetch(`${BASE_API}${url}`, {
                method: "delete",
                credentials: "include",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Content-Language": option?.language?.locale ?? "",
                }),
            });

            if (!response.ok) throw await response.json();

            this.response = response.headers.get("Content-Type")?.includes("application/json")
                ? await response.json()
                : null;
        } catch (error: any) {
            this.error = error;
        }

        return {
            onDone: (fn: (response: any) => any) => this.onDone(fn),
            onError: (fn: (error: { error: { message: string }[]; redirect?: string }) => any) => this.onError(fn),
        };
    }

    private onDone(fn: (response: any) => any) {
        if (this.error) return;
        return fn(this.response);
    }

    private onError(fn: (error: { error: { message: string }[]; redirect?: string }) => any) {
        if (!this.error) return;
        return fn(this.error);
    }
}
