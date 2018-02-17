import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDom from "react-dom";
import { History, createBrowserHistory, createHashHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import * as ReactRouterRedux from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// helpers
import EnvChecker from "./helpers/envChecker";
// root reducer
import { rootReducer, initialState } from "./reducers";
// routes
import { RootRoutes } from "./routes";
import { Store } from "redux";
import ReduxNotifier from "./helpers/notifier";

class ClientSideRenderer {
  private history: History;
  private routerMiddleware = ReactRouterRedux.routerMiddleware(this.getHistoryObject());

  private loggerMiddleware = createLogger({
    stateTransformer: state => {
      const newState: any = {};
      for (const i of Object.keys(state)) {
        if ((Immutable as any).Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS();
        } else {
          newState[i] = state[i];
        }
      }
      return newState;
    },
  });

  private getHistoryFromEnvironment() {
    if (EnvChecker.isDev()) {
      return createHashHistory();
    } else {
      return createBrowserHistory();
    }
  }

  private getHistoryObject() {
    if (this.history) {
      return this.history;
    } else {
      this.history = this.getHistoryFromEnvironment();
      return this.history;
    }
  }

  private getStore() {
    if (EnvChecker.isDev()) {
      return createStore(
        rootReducer,
        initialState,
        applyMiddleware(this.routerMiddleware, thunkMiddleware, ReduxNotifier, this.loggerMiddleware),
      );
    } else {
      return createStore(
        rootReducer,
        initialState,
        applyMiddleware(this.routerMiddleware, thunkMiddleware, ReduxNotifier),
      );
    }
  }

  public store: Store<any> = this.getStore();

  public renderReactApp() {
    ReactDom.render(
      <Provider store={this.store}>
        <MuiThemeProvider>
          <ReactRouterRedux.ConnectedRouter history={this.getHistoryObject()}>
            <RootRoutes />
          </ReactRouterRedux.ConnectedRouter>
        </MuiThemeProvider>
      </Provider>,
      document.getElementById("react-app"),
    );
  }
}

const reactRenderer = new ClientSideRenderer();

reactRenderer.renderReactApp();

export default reactRenderer;
