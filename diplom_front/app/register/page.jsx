"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import UserContext from "@/context/user_context";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const defaultTheme = createTheme();

//Sign up хуудас.
const RegisterPage = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const usCtx = useContext(UserContext);

  const signUpButtonClick = async (e) => {
    e.preventDefault();
    if (fName != "" && lName != "" && email != "" && password != "") {
      try {
        await usCtx.signUp(fName, lName, email, password);
        toast.success("Sign Up successful");
        router.push("/");
      } catch (err) {
        toast.error("Invalid username or phone number or address or password");
      }
      toast.success("Sign Up successful");
    } else {
      toast.error("Invalid username or phone number or address or password");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        className="h-screen w-screen fixed left-0 top-0"
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Бүртгүүлэх
            </Typography>
            <form className="flex flex-col items-center w-full">
              <div className=" mt-4 w-full">
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="text"
                  placeholder="Нэр"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  required
                />
              </div>
              <div className=" mt-4 w-full">
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="text"
                  placeholder="Овог"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 mt-4 w-full">
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="text"
                  placeholder="Email хаяг"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 w-full">
                <input
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="password"
                  placeholder="Нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                className="bg-blue-500"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  signUpButtonClick(e);
                }}
              >
                Бүртгүүлэх
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {" "}
                    <div className="text-blue-500 underline">
                      {"Бүртгэлтэй хэрэглэгч байгаа бол"}
                    </div>
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    // <div className="flex items-center justify-center   mx-0">
    //   <div
    //     style={{ width: "480px", maxWidth: "480px", minWidth: "360px" }}
    //     className="mt-20 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    //   >
    //     <form className="flex flex-col items-center ">
    //       <h2 className="mb-5 text-4xl font-semibold">Sign up</h2>
    //       <div className="mb-4 mt-4 w-full">
    //         <input
    //           className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
    //           type="text"
    //           placeholder="first name"
    //           value={fName}
    //           onChange={(e) => setFName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4 mt-4 w-full">
    //         <input
    //           className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
    //           type="text"
    //           placeholder="last name"
    //           value={lName}
    //           onChange={(e) => setLName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4 mt-4 w-full">
    //         <input
    //           className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
    //           type="text"
    //           placeholder="Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>

    //       <div className="mb-8 w-full">
    //         <input
    //           className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
    //           type="password"
    //           placeholder="Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>

    //       <button
    //         type="button"
    //         className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
    //         onClick={(e) => {
    //           signUpButtonClick(e);
    //         }}
    //       >
    //         Sign Up
    //       </button>

    //       <hr className="mt-4" />

    //       <p className="text-center mt-5">
    //         Бүртгэлтэй хэрэглэгч байгаа бол{" "}
    //         <Link href="/login" className="text-blue-500">
    //           энд
    //         </Link>{" "}
    //         дарна уу.
    //       </p>
    //     </form>
    //   </div>
    // </div>
  );
};

export default RegisterPage;
