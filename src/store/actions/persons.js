import api, { popularPersons } from "../../api/api";
import {
  FETCH_POPULAR_PERSONS
} from "../types";

export const loadPersons = () => async (dispatch) => {
  const popular = await api.get(popularPersons());

  dispatch({
    type: FETCH_POPULAR_PERSONS,
    payload: popular.data.results,
  });

};
