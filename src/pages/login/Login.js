import useValidate from "../../Hooks/useBasicForm";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedInAction } from "../../Store/loggedIn";
// import Navbar from "../../components/NavBar";
// import Footer from "../../components/Footer";
const BasicForm = () => {
  const dispatch = useDispatch();
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  var passPattern = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
  );
  const naviagte = useNavigate();
  const {
    enteredValue: enterdPassword,
    reset: resetPassword,
    isValid: PasswordIsValid,
    hasError: PasswordHasError,
    valueBlurHandler: PasswordBlurHandler,
    valueChangeHandler: PasswordChangeHandler,
  } = useValidate((value) => passPattern.test(value));

  const {
    enteredValue: enterdEmail,
    reset: resetEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidate((value) => pattern.test(value));

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!PasswordIsValid) {
      return;
    }
    if (!emailIsValid) {
      return;
    }

    resetPassword();
    resetEmail();
    localStorage.setItem("login", "true");
    dispatch(loggedInAction.changeLoginStatus());
    naviagte("/");
  };

  const PasswordClasses = PasswordHasError
    ? "form-control-invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control-invalid" : "form-control";
  return (
    <>
      {/* <Navbar /> */}
      <h1
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "black",
          }}
          to="/"
        >
          ECOM.
        </Link>
      </h1>
      <div className="container-login-form">
        <div className="login-invest">
          <div className="form form_class">
            <form action="" className="login-form" onSubmit={formSubmitHandler}>
              <span className="materialUi">Log in</span>
              <div className="login-form1 form-group error-login">
                <label htmlFor="email">Email</label>

                <input
                  className={emailClasses}
                  onBlur={emailBlurHandler}
                  type="text"
                  onChange={emailChangeHandler}
                  value={enterdEmail}
                  autoComplete="off"
                />
                {emailHasError && <p className="error-text">Email Invalid</p>}
              </div>

              <div className="login-form2 form-group error-login">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onBlur={PasswordBlurHandler}
                  onChange={PasswordChangeHandler}
                  value={enterdPassword}
                  autoComplete="off"
                  className={PasswordClasses}
                />
                {PasswordHasError && (
                  <p className="error-text">Password Invalid</p>
                )}
              </div>

              <div className="button-box">
                <button
                  className="login_button"
                  disabled={!(PasswordIsValid && emailIsValid)}
                >
                  Log In
                </button>
                {/* <div className="forget_password">
                  {" "}
                  <Link className="forgot_link" to="/forgot">
                    Forget Password
                  </Link>
                </div> */}
              </div>

              <div className="bottom_log">
                {" "}
                <div className="dont_account">
                  Don't have an account?
                  <span className="instead">
                    <Link
                      style={{ textDecoration: "none", color: "#1976d2" }}
                      to="/signUp"
                    >
                      Sign up instead
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BasicForm;
