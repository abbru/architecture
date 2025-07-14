import { Click } from "../models/Click";

export interface ClickRepository {
  updateClickStatus(click: Click): Promise<void>;
}
