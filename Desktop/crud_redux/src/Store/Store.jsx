import { legacy_createStore } from "redux";
import reducer from "../Config/Reducer";

export const Store = legacy_createStore(reducer)