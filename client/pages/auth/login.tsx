import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { login } from "../api";
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

function LoginPage() {
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
    Parameters<typeof login>["0"]
  >(login, {
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <Title>Login</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="Email address"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                required
                {...form.getInputProps("password")}
              />
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default LoginPage;
