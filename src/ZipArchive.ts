#!/usr/bin/env node
'use strict';

const StreamZip = require('node-stream-zip');

class ZipArchive {
    private path;
    private zip;

    public constructor(zipFilePath) {
        this.path = zipFilePath;
    }

    private static streamToString = (stream): Promise<string> => new Promise(resolve => {
        const chunks = [];
        stream.on('data', (chunk) => {
            chunks.push(chunk.toString());
        });
        stream.on('end', () => {
            resolve(chunks.join(''));
        });
    });

    public zipOpen = () => new Promise(resolve => {
        this.zipClose();
        this.zip = new StreamZip({
            file: this.path,
            storeEntries: true
        });
        this.zip.on('ready', () => {
            resolve();
        });
    });

    public zipClose = () => {
        if (this.zip) {
            const closeResponse = this.zip.close();
            this.zip = null;
            return closeResponse;
        }
    }

    public getFileList = (filterCondition?: (filePath: string) => boolean): Promise<string[]> => new Promise(resolve => {
        const entries = [];
        for (const entry of Object.values(this.zip.entries())) {
            if (filterCondition ? filterCondition((entry as any).name) : true)
                entries.push((entry as any).name);
        }
        resolve(entries);
    });

    public getZipFileContents = (filePath): Promise<string> => new Promise(resolve => {
        this.zip.stream(filePath, (err, stm) => {
            ZipArchive.streamToString(stm).then(resolve);
        });
    });
}

export default ZipArchive;
