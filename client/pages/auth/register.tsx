import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { registerUser } from "../api";
import Head from "next/head";
import {
  Container,
  Title,
  Paper,
  Button,
  TextInput,
  Stack,
  PasswordInput,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "Creating account",
        message: "Please wait...",
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: "register",
        title: "Success",
        message: "Successfully created account",
      });

      router.push("/auth/login");
    },
    onError: () => {
      updateNotification({
        id: "register",
        title: "Error",
        message: "Could not create account",
      });
    },
  });

  return (
    <>
      <Head>
        <title>Register user</title>
      </Head>
      <Container>
        <Title>Register</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="Email address"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Username"
                placeholder="Username"
                required
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                required
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm Password"
                required
                {...form.getInputProps("confirmPassword")}
              />

              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default RegisterPage;
