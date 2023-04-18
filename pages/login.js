import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import LoginForm from "../components/LoginForm";

export default function login() {
  return (
    <>
      <Layout>
        <Head title="Login" />
        <LoginForm />
      </Layout>
    </>
  );
}
