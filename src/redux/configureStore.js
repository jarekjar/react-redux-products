import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "../redux/epics/rootEpic";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, epicMiddleware, reduxImmutableStateInvariant())
    )
  );
  epicMiddleware.run(rootEpic);
  return store;
}
