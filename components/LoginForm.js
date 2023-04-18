import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { STRAPI_AUTH_URL, STRAPI_URL } from "../constants/api";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

const url = STRAPI_URL + STRAPI_AUTH_URL;

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(false);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      history.push("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <span className="error">{loginError}</span>}
        <fieldset disabled={submitting}>
          <div>
            <input
              name="identifier"
              placeholder="Username"
              {...register("identifier", { required: true })}
            />
            {errors.identifier && (
              <span className="error">{errors.identifier.message}</span>
            )}
          </div>

          <div>
            <input
              name="password"
              placeholder="Password"
              {...register("password", { required: true })}
              type="password"
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
          <button>{submitting ? "Loggin in..." : "Login"}</button>
        </fieldset>
      </form>
    </>
  );
}
