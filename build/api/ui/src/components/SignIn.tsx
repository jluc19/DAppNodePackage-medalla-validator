import React, { useState } from "react";
import * as auth from "api/auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FooterNote } from "./FooterNote";
import { InputPassword } from "./InputPassword";
import { RequestStatus } from "types";
import { ErrorView } from "./ErrorView";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignIn({
  onSignIn,
  isOffline,
}: {
  onSignIn: () => void;
  isOffline?: boolean;
}) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<RequestStatus<string>>({});
  const classes = useStyles();

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      // Do signIn
      setStatus({ loading: true });
      const result = await auth.login(input);
      setStatus({ result });
      console.log("Logged in", result);
    } catch (e) {
      console.error(e);
      setStatus({ error: e.message });
    } finally {
      onSignIn();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={signIn}>
          <InputPassword
            password={input}
            setPassword={setInput}
            error={Boolean(status.error)}
          />

          {status.error && <ErrorView error={status.error} />}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={status.loading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      {isOffline && (
        <Box m={4}>
          <Typography color="error" align="center">
            Cannot connect with the server
            <br />
            are you online?
          </Typography>
        </Box>
      )}

      <Box mt={8}>
        <FooterNote />
      </Box>
    </Container>
  );
}
