import { ParsedQs } from "qs";
import { json2csvAsync } from "json-2-csv";
export class JsonConverter {
  public convertJsonToObject<T>(
    Json: string | ParsedQs | string[] | ParsedQs[]
  ) {
    try {
      return typeof Json === "string" ? (JSON.parse(Json) as T) : (Json as T);
    } catch (err) {
      console.error("Error converting Json");
    }
  }
  public async convertJsonToCsv(Json: object[]) {
    try {
      return await json2csvAsync(Json);
    } catch (err) {
      console.error("Error converting Json");
    }
  }
}
