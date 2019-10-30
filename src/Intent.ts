#!/usr/bin/env node
'use strict';

interface IUserSay {
    text: string;
    alias: string;
    meta: string;
}

interface IResponse {
    payload?: any;
    speech?: any;
    lang: string;
}

class Intent {

    private _name: string;
    private _userSays: IUserSay[];
    private _response: IResponse;

    public constructor(name: string, userSays: IUserSay[], response: IResponse) {
        this._name = name;
        this._userSays = userSays;
        this._response = response;
    }

    get response(): IResponse {
        return this._response;
    }

    get userSays(): IUserSay[] {
        return this._userSays;
    }

    get name(): string {
        return this._name;
    }

    public toObject() {
        return {
            name: this.name,
            userSays: this.userSays,
            responses: this.response,

        };
    }

    public toString(): string {
        return JSON.stringify(this.toObject());
    }

}

export default Intent;
