import React from "react";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import { useDispatch, useSelector } from "react-redux";
import { updateVal } from "../../features/register/action";
import {
  Button,
  Container,
  FlexboxGrid,
  Input,
  Tooltip,
  Whisper,
} from "rsuite";
import * as yup from "yup";
import { selectEmail, selectPassword } from "../../features/register/selectors";
import { useDebouncedCallback } from "use-debounce";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
const Auth = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const dispatch = useDispatch();
  const updateStore = useDebouncedCallback((key, val) => {
    dispatch(updateVal({ key, val }));
  }, 375);

  return (
    <Container style={{ height: "100vh", display: "flex" }}>
      <FlexboxGrid align="middle" justify="center" style={{ height: "100vh" }}>
        <Formik
          validateOnChange={false}
          initialValues={{
            email: email,
            password: password,
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log({ values });
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            isValid,
            errors,
            touched,
            values,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Whisper
                  trigger="none"
                  open={errors.email && touched.email}
                  speaker={<Tooltip>{errors.email}</Tooltip>}
                >
                  <Input
                    className="mb-20"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={(val, event) => {
                      handleChange(event);
                      updateStore("email", val);
                    }}
                    style={{ borderColor: errors.email ? "red" : "inherit" }}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Whisper>
                <Whisper
                  trigger="none"
                  open={errors.password && touched.password}
                  speaker={<Tooltip>{errors.password}</Tooltip>}
                >
                  <Input
                    className="mb-20"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(val, event) => {
                      handleChange(event);
                      updateStore("password", val);
                    }}
                    style={{ borderColor: errors.password ? "red" : "inherit" }}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </Whisper>
                <Button type="submit">Log-in</Button>
                <Persist name="signup-form" />
              </form>
            );
          }}
        </Formik>
      </FlexboxGrid>
    </Container>
  );
};

export default Auth;
