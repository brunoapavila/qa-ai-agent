import * as fs from "fs";

export class FileService {

    read(path: string): string {

        return fs.readFileSync(path, "utf8");

    }

}