import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function Layout({ children }) {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useRouter();

  function logOut() {
    setAuth(null);
    history.push("/");
  }
  return (
    <>
      <nav>
        <Link className="nav-link" href="/">
          Home
        </Link>
        <Link className="nav-link" href="/contact">
          Contact
        </Link>
        {auth ? (
          <>
            | <button onClick={logOut}>Log out</button>{" "}
          </>
        ) : (
          <Link className="nav-link" href="/login">
            Login
          </Link>
        )}
      </nav>

      <div className="container">{children}</div>
    </>
  );
}
