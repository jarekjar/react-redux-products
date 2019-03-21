import { pingEpic } from "./pingEpic";
import { businessEpic } from "./businessEpic";
import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(pingEpic, businessEpic);
