import reducer from "./reducers";

import * as authSagas from "./sagas";
import * as authActions from "./actions";
import * as authType from "./types";

export {
  authSagas,
  authActions,
  authType
};

export default reducer;