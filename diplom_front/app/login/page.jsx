"use client";
import UserContext from "@/context/user_context";
import Link from "next/link";
import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Linkk from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Log in хуудас.
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Linkk color="inherit" href="https://mui.com/">
        EThrift
      </Linkk>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const ctx = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        className="h-screen top-0 left-0  fixed w-screen "
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542058186993-286fdce0b580?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Нэвтрэх
            </Typography>
            <form
              className="  w-full mt-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="mb-4  w-full">
                <input
                  id="username"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2  hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="email"
                  placeholder="Email хаяг"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <input
                  id="password"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="password"
                  placeholder="Нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                onClick={() => {
                  ctx.login(password, username);
                }}
                type="submit"
                className="bg-blue-500"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Нэвтрэх
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/recover">
                    <div className="text-blue-500 underline">
                      Нууц үгээ мартсан уу?
                    </div>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register">
                    <div className="text-blue-500 underline">
                      {"Шинээр хэрэглэгчийн бүртгэл үүсгэх"}
                    </div>
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />{" "}
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    // <div className="flex items-center justify-center ">
    //   <div
    //     style={{ width: "480px", maxWidth: "480px", minWidth: "360px" }}
    //     className="mt-20 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    //   >
    //     <form className="flex flex-col items-center ">
    //       <h2 className="mb-5 text-4xl font-semibold">Login</h2>

    //       <div className="mb-4 mt-12 w-full">
    //         <input
    //           id="username"
    //           className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
    //           type="text"
    //           placeholder="Username"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           required
    //         />
    //       </div>

    //       <div className="mb-8 w-full">
    //         <input
    //           id="password"
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
    //         onClick={() => {
    //           ctx.login(password, username);
    //         }}
    //       >
    //         Login
    //       </button>

    //       <hr className="mt-4" />

    //       <p className="text-center mt-5">
    //         Бүртгүүлэх бол{" "}
    //         <Link href="/register" className="text-blue-500">
    //           энд
    //         </Link>{" "}
    //         дарна уу.
    //       </p>
    //     </form>
    //   </div>
    // </div>
  );
};

export default LoginPage;
