import { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

import { useRouter } from "../../../routes/hooks";
import { setCredentials } from "../../../slices/AuthSlice.js";
import { useRegisterMutation } from "../../../slices/usersApiSlice.js";

// --------------------------Register---------------------------- //

const RegisterView = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = router.push;
  const dispatch = useDispatch();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const validateSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("User Name is required"),
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
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validateSchema),
  });

  const registerSubmit = async (values) => {
    try {
      const res = await registerUser({
        firstName: values?.firstName,
        lastName: values?.lastName,
        userName: values?.userName,
        email: values?.email,
        password: values?.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Registration Successful");
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
            Register
          </Typography>

          <Divider sx={{ my: 3 }} />

          <form noValidate onSubmit={handleSubmit(registerSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="First Name"
                type="text"
                name="firstName"
                fullWidth
                variant="outlined"
                margin="dense"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />

              <TextField
                label="Last Name"
                type="text"
                name="lastName"
                fullWidth
                variant="outlined"
                margin="dense"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />

              <TextField
                label="Username"
                type="text"
                name="userName"
                fullWidth
                variant="outlined"
                margin="dense"
                {...register("userName")}
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />

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
                Sign Up
              </LoadingButton>
            </Stack>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body2"
            sx={{ mt: 2, mb: 5 }}
            textAlign={"center"}
          >
            Already have an account?
            <Link to="/login" variant="subtitle2" style={{ marginLeft: 3 }}>
              Login Now
            </Link>
          </Typography>
          <DevTool control={control} />
        </Card>
      </Stack>
    </Box>
  );
};

export default RegisterView;
