import Confetti from "react-confetti";
import { toast } from "react-toastify";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "./routes/hooks";

import { useLogoutMutation } from "./slices/usersApiSlice";
import { clearCredentials } from "./slices/AuthSlice";

// --------------------------App---------------------------- //

const App = () => {
  const router = useRouter();
  const navigate = router.push;
  const dispatch = useDispatch();

  const [logoutApicall] = useLogoutMutation();

  const logoutSubmit = () => {
    try {
      logoutApicall().unwrap();
      dispatch(clearCredentials());
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Confetti
        drawShape={(ctx) => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
        recycle={false}
        numberOfPieces={500}
      />
      <Box>
        <Stack gap={1}>
          <Typography>Congratulations! You are Logged in!</Typography>
          <Button variant="contained" onClick={logoutSubmit}>
            Logout
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default App;
