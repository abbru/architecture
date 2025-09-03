import { ClickRepository } from "../../domain/repositories/ClickRepository";
import { Click } from "../../domain/models/Click";

export class InMemoryClickRepository implements ClickRepository {
  private clicks: Record<string, string> = {
    abbru123: "updated",
  };

  async updateClickStatus(click: Click): Promise<void> {
    this.clicks[click.idClick] = "updated";
  }
}
