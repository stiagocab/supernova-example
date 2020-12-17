
// redux => actions
const tryLogin = (email, password) => (dispatch, getState) => {
  dispatch({
    type: LOGGING,
  });

  Axios.post(`users/login`, {
    email,
    password,
  })
    .then(async ({ data, status }) => {
      if (status !== 200) throw new Error();

      const isAdmin = await getUserPermission(data);

      if (!isAdmin) {
        return dispatch({
          type: LOGGING_ERROR,
          payload: "NO CUENTAS CON LOS PERMISOS NECESARIOS",
        });
      }

      saveToken(data);

      dispatch({
        type: LOGGING_SUCCESS,
        payload: data,
      });

      getUserData()(dispatch, getState);

    })
    .catch(() => {
      dispatch({
        type: LOGGING_ERROR,
        payload: "Ocurrió un error, intenta más tarde.",
      });
    });
    
};
