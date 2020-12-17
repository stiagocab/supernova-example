import React, { useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  GoogleLoginButton,
  AppleLoginButton,
  FacebookLoginButton,
} from "../../../components/Buttons";
import logo from "../../../assets/icons/crear_construir_crecer.png";
import { InputEmail, InputPassword } from "../Input";
import { MinText, Text } from "../../../assets/styles/Text";
import { tryLogin } from "../../../store/actions/Auth";
import useQuery from "../../../hooks/useQuery";

import {
  Page,
  Card,
  HeaderCard,
  BodyCard,
  OtherOption,
} from "../../../assets/styles/Auth";

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggin, messageError = "" } = useSelector((state) => state.auth);
  let query = useQuery().get("redirect");

  const redirect = useCallback(() => {
    history.replace(query ? `/${query}` : "/noticias");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (isLoggin) {
      redirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggin]);

  const doLogin = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    dispatch(tryLogin(email, password));
  };

  return (
    <Page>
      <Card>
        <HeaderCard>
          <img src={logo} alt="logo" className="desk" />
        </HeaderCard>
        <BodyCard>
          <form onSubmit={doLogin}>
            <InputEmail />
            <br />
            <InputPassword />
            <br />
            <MinText as={Link} to="/recuperar-contrasena" weight="nomal">
              Olvide mi contraseña
            </MinText>
            <br />
            <Button color="white" size="0.8em">
              INICIAR SESIÓN
            </Button>
          </form>
          <br />
          <MinText weight="700" color="crimson" children={messageError} />
          <OtherOption>
            <Text children="Iniciar con:" color="#bab6b6" />
            <div className="social-options">
              <FacebookLoginButton />
              <GoogleLoginButton /> 
              <AppleLoginButton /> 
            </div>
          </OtherOption>
        </BodyCard>
      </Card>
    </Page>
  );
}
