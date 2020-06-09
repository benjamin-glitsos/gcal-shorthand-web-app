import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import updaterModules from "./updaters/*.js";
import { uncapitalise, fromEntries } from "~/lib/utilities";

const updaters = updaterModules.map(module => {
    const updater = module.default;
    const [reducer, actions] = createUpdater(updater);
    return [uncapitalise(updater.name), { reducer, actions, updater }];
});

export const { history, input, review, user } = Object.fromEntries(updaters);

export const rootReducer = combineReducers(
    Object.fromEntries(updaters.map(([name, values]) => [name, values.reducer]))
);
