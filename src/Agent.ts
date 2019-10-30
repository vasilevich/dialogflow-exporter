#!/usr/bin/env node
'use strict';

import ZipArchive from './ZipArchive';
import Intent from './Intent';


class Agent {
    private zip;
    private _intents: Intent[] = [];


    public constructor(zipFilePath) {
        this.zip = new ZipArchive(zipFilePath);
    }

    public init = async () => {
        await this.zip.zipOpen();
        let files = await this.zip.getFileList((filePath => filePath.endsWith(".json")));
        const intentFiles = files.filter(name => name.startsWith("intents/") && !name.includes("_usersays_"));
        const intentUserSaysFiles = files.filter(name => name.startsWith("intents/") && name.includes("_usersays_"));
        const totalIntentFiles = intentFiles.length;
        for (let intentIndex = 0; intentIndex < totalIntentFiles; intentIndex++) {
            const {name, responses} = JSON.parse(await this.zip.getZipFileContents(intentFiles[intentIndex]));
            const intentUserSaysJson = intentUserSaysFiles.find(n => n.startsWith("intents/" + name + "_"));
            const intentUserSays = intentUserSaysJson ? JSON.parse(await this.zip.getZipFileContents(intentUserSaysJson)) : [];
            const {payload, lang, speech} = responses.map(response => response.messages[0])[0];
            const response: any = {lang};
            if (payload)
                responses.payload = payload;
            if (speech)
                responses.speech = speech;
            this._intents.push(
                new Intent(
                    name,
                    intentUserSays.map(({data}) => data[0]).map(({id, text, alias, meta}) => ({id, text, alias, meta})),
                    response));
        }
        this.zip.zipClose();
        return this;
    }

    get intents(): Intent[] {
        return this._intents;
    }

    public toString(): string {
        return JSON.stringify(this.intents.map(intent => intent.toObject()));
    }

}

export default Agent;
