import "./SignUp.css";
import useValidate from "../../Hooks/useBasicForm";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedInAction } from "../../Store/loggedIn";
const SignUp = (props) => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  var passPatter = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
  );
  const {
    enteredValue: enterdFirstName,
    reset: resetFirstName,
    isValid: FirstNameIsValid,
    hasError: FirstNameHasError,
    valueBlurHandler: FirstNameBlurHandler,
    valueChangeHandler: FirstNameChangeHandler,
  } = useValidate((value) => value.trim() !== "");

  const {
    enteredValue: enterdLastName,
    reset: resetLastName,
    isValid: LastNameIsValid,
    hasError: LastNameHasError,
    valueBlurHandler: LastNameBlurHandler,
    valueChangeHandler: LastNameChangeHandler,
  } = useValidate((value) => value.trim() !== "");

  const {
    enteredValue: enterdPhone,
    reset: resetPhone,
    isValid: PhoneIsValid,
    hasError: PhoneHasError,
    valueBlurHandler: PhoneBlurHandler,
    valueChangeHandler: PhoneChangeHandler,
  } = useValidate((value) => value.length === 10);
  const {
    enteredValue: enterdEmail,
    reset: resetEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useValidate((value) => pattern.test(value));

  const {
    enteredValue: enterdPassword,
    reset: resetPassword,
    isValid: PasswordIsValid,
    hasError: PasswordHasError,
    valueBlurHandler: PasswordBlurHandler,
    valueChangeHandler: PasswordChangeHandler,
  } = useValidate((value) => passPatter.test(value));
  const {
    enteredValue: enterdConfirmPassword,
    reset: resetConfirmPassword,
    isValid: ConfirmPasswordIsValid,
    hasError: ConfirmPasswordHasError,
    valueBlurHandler: ConfirmPasswordBlurHandler,
    valueChangeHandler: ConfirmPasswordChangeHandler,
  } = useValidate(
    (value) => passPatter.test(value) && value === enterdPassword
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!FirstNameIsValid) {
      return;
    }
    if (!LastNameIsValid) {
      return;
    }
    if (!emailIsValid) {
      return;
    }
    if (!PhoneIsValid) {
      return;
    }
    if (!PasswordIsValid) {
      return;
    }
    if (!ConfirmPasswordIsValid) {
      return;
    }

    resetPassword();
    resetEmail();
    resetFirstName();
    resetLastName();
    resetPhone();
    resetPassword();
    resetConfirmPassword();
    navigate("/");
    localStorage.setItem("login", "true");
    dispatch(loggedInAction.changeLoginStatus());
  };

  const PasswordClasses = PasswordHasError
    ? "form-control-invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control-invalid" : "form-control";
  const FirstNameClasses = FirstNameHasError
    ? "form-control-invalid"
    : "form-control";
  const LastNameClasses = LastNameHasError
    ? "form-control-invalid"
    : "form-control";
  const ConfirmPasswordClasses = ConfirmPasswordHasError
    ? "form-control-invalid"
    : "form-control";
  const PhoneClasses = PhoneHasError ? "form-control-invalid" : "form-control";
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
              <span className="materialUi">Sign Up</span>
              <div className="login-form2 form-group error-login">
                <label htmlFor="FirstName">First Name</label>
                <input
                  type="text"
                  onBlur={FirstNameBlurHandler}
                  onChange={FirstNameChangeHandler}
                  value={enterdFirstName}
                  autoComplete="off"
                  className={FirstNameClasses}
                />
                {FirstNameHasError && (
                  <p className="error-text">First name required</p>
                )}
              </div>
              <div className="login-form2 form-group error-login">
                <label htmlFor="Last Name">Last Name</label>
                <input
                  type="text"
                  onBlur={LastNameBlurHandler}
                  onChange={LastNameChangeHandler}
                  value={enterdLastName}
                  autoComplete="off"
                  className={LastNameClasses}
                />
                {LastNameHasError && (
                  <p className="error-text">Last name required</p>
                )}
              </div>

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
                {emailHasError && (
                  <p className="error-text">Valid email required</p>
                )}
              </div>

              <div className="login-form2 form-group error-login">
                <label htmlFor="Phone">Phone number</label>
                <input
                  type="number"
                  onBlur={PhoneBlurHandler}
                  onChange={PhoneChangeHandler}
                  value={enterdPhone}
                  autoComplete="off"
                  className={PhoneClasses}
                />
                {PhoneHasError && (
                  <p className="error-text">Valid phone number required</p>
                )}
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
              <div className="login-form2 form-group error-login">
                <label htmlFor="Confirmpassword"> Confirm Password</label>
                <input
                  type="password"
                  onBlur={ConfirmPasswordBlurHandler}
                  onChange={ConfirmPasswordChangeHandler}
                  value={enterdConfirmPassword}
                  autoComplete="off"
                  className={ConfirmPasswordClasses}
                />
                {ConfirmPasswordHasError && (
                  <p className="error-text">Password donot match</p>
                )}
              </div>

              <div className="button-box">
                <button
                  disabled={
                    !(
                      FirstNameIsValid &&
                      LastNameIsValid &&
                      PhoneIsValid &&
                      emailIsValid &&
                      PasswordIsValid &&
                      ConfirmPasswordIsValid
                    )
                  }
                  className="login-button "
                >
                  Sign Up
                </button>
                <div className="bottom_log">
                  {" "}
                  <div className="dont_account">
                    Already have an account?
                    <span className="instead">
                      <Link
                        style={{ textDecoration: "none", color: "#1976d2" }}
                        to="/login"
                      >
                        Login instead
                      </Link>
                    </span>
                  </div>
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
export default SignUp;
