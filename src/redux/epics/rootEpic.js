import { pingEpic } from "./pingEpic";
import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(pingEpic);
