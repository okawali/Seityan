import * as fs from "fs";
import * as path from "path";
import axios from "axios";

export interface ModelDescription {
    basePath: string,
    modelFile: string
}

export class ModelLoader {
    static async loadModel(model: ModelDescription): Promise<object | null> {
        var modelPath = path.join(model.basePath, model.modelFile);
        var response = await axios.get(modelPath);
        return response.data;
    }

    static parseModelPath(path: string): ModelDescription {
        var index = path.lastIndexOf("/");
        var basePath = path.substr(0, index + 1);
        var modelFile = path.substr(index + 1);
        return { basePath, modelFile };
    }
}
