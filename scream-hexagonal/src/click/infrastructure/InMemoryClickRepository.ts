import { ClickRepository } from "../domain/ClickRepository";
import { Click } from "../domain/Click";

export class InMemoryClickRepository implements ClickRepository {
  private clicks: Record<string, string> = {
    abbru123: "updated",
  };

  async updateClickStatus(click: Click): Promise<void> {
    this.clicks[click.idClick] = "updated";
  }
}
