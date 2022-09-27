import React from "react";
import { Formik, Form } from "formik";
import { Persist } from "formik-persist";
import { useDispatch, useSelector } from "react-redux";
import { updateVal } from "../../features/register/action";
import { Container, FlexboxGrid } from "rsuite";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as yup from "yup";
import { selectEmail, selectPassword } from "../../features/register/selectors";
import { useDebouncedCallback } from "use-debounce";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
  username: yup
    .string()
    .test("username", "We already got this username", async (inputValue) => {
      const data = await await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((res) => res.json());

      const user = data.find(({ username }) => username === inputValue);
      return user ? false : true;
    }),
});
const Register = () => {
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
            username: "",
            email: email,
            password: password,
            passwordConfirmation: "",
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
            const onInputChange = (val, event) => {
              handleChange(event);
              updateStore("username", val);
            };

            return (
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={(val, event) => onInputChange(val, event)}
                  onBlur={handleBlur}
                  value={values.username}
                />

                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  onChange={(val, event) => {
                    handleChange(event);
                    updateStore("email", val);
                  }}
                  style={{ borderColor: errors.email ? "red" : "inherit" }}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(val, event) => {
                    handleChange(event);
                    updateStore("password", val);
                  }}
                  style={{ borderColor: errors.password ? "red" : "inherit" }}
                  onBlur={handleBlur}
                  value={values.password}
                />

                <Input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="Password Confirmation"
                  onChange={(val, event) => {
                    handleChange(event);
                    updateStore("passwordConfrimation", val);
                  }}
                  style={{
                    borderColor: errors.passwordConfirmation
                      ? "red"
                      : "inherit",
                  }}
                  onBlur={handleBlur}
                  value={values.passwordConfirmation}
                />

                <Button type="submit" disabled={!isValid} text="SUBMIT" />

                <Persist name="signup-form" />
              </Form>
            );
          }}
        </Formik>
      </FlexboxGrid>
    </Container>
  );
};

export default Register;
