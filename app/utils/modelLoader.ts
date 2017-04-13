import * as fs from "fs";
import * as path from "path";

export interface ModelDescription {
    basePath: string,
    modelFile: string
}

export default class ModelLoder {
    static loadModel(model: ModelDescription): object | null {
        var modelPath = path.join(model.basePath, model.modelFile);
        if (fs.existsSync(path.join(modelPath))) {
            return JSON.parse(fs.readFileSync(modelPath, "utf-8"));
        } else {
            return null;
        }
    }
}