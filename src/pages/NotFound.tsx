import { Center, Stack, Text } from "@mantine/core";
import { pageIconNotFound } from "../resources/icons";
import { FULL_PAGE_TEXT_SIZE } from "../commons/constants";

const NotFound = () =>
  <Center style={{ height: "100%" }}>
    <Stack align="center" justify="center" spacing="xs" >
      {pageIconNotFound}
      <Text size={FULL_PAGE_TEXT_SIZE} weight={700}>Page not found</Text>
    </Stack>
  </Center>;
export default NotFound;
