import { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Card,
  Stack,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { setCredentials } from "../../../slices/AuthSlice.js";
import { useLoginMutation } from "../../../slices/usersApiSlice.js";

// --------------------------Login---------------------------- //

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Enter your password")
      .matches(
        /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Uppercase, Lowercase, and Special Character Required"
      )
      .min(8, "Password should be minimum 8 characters")
      .max(50, "Too Long"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validateSchema),
  });

  const loginSubmit = async (data) => {
    try {
      const res = await loginUser({
        email: data?.email,
        password: data?.password,
      }).unwrap();
      console.log("Login response:", res);
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <Box>
      <Stack alignItems={"center"} justifyContent={"center"} sx={{ height: 1 }}>
        <Card
          sx={{
            p: 3,
            width: 1,
            maxWidth: 500,
          }}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight={"700"}
            textTransform={"uppercase"}
          >
            Login
          </Typography>

          <Divider sx={{ my: 3 }} />

          <form noValidate onSubmit={handleSubmit(loginSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="email"
                name="email"
                fullWidth
                variant="outlined"
                margin="dense"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                margin="dense"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <LoadingButton
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                loading={isLoading}
                size="large"
              >
                Login
              </LoadingButton>
            </Stack>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body2"
            sx={{ mt: 2, mb: 5 }}
            textAlign={"center"}
          >
            {"Don't have an account?"}
            <Link to="/register" variant="subtitle2" style={{ marginLeft: 3 }}>
              Register Now
            </Link>
          </Typography>
          <DevTool control={control} />
        </Card>
      </Stack>
    </Box>
  );
};

export default LoginView;
