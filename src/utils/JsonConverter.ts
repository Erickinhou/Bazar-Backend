export class JsonConverter {
  public convertJsonToObject<T>(Json: string) {
    try {
      return JSON.parse(Json) as T;
    } catch (err) {
      return;
    }
  }
}
