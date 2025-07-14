import { Click } from "./Click";

export interface ClickRepository {
  updateClickStatus(click: Click): Promise<void>;
}
