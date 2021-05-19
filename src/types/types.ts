
import { upLoadTask } from "../lib/firebase";

export interface uploadFileType {
  id: string;
  rate: number;
  name: string;
  failed: boolean;
  paused: boolean;
  upLoadTask: upLoadTask;
}

export type State = { id: string; name: string }[]
