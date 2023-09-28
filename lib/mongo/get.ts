import { Collection, Filter, WithId, Document } from "mongodb";
import init from "./init";

async function get(query: Filter<Document> | undefined, collectionName: Collection ) {
    try {
        if (!collectionName) await init(collectionName);
        const result = await (query ? collectionName.find(query) : collectionName.find()).toArray();
        return result;
    } catch (error) {
        return { error: `Failed to fetch ${collectionName}` };
    }
}

export default get;