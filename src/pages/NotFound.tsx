import { Center, Stack, Text } from "@mantine/core";
import { pageIconNotFound } from "../resources/icons";
import { FULL_PAGE_TEXT_PROPS } from "../commons/constants";

const NotFound = () =>
  <Center style={{ height: "100%" }}>
    <Stack align="center" justify="center" spacing="xs" >
      {pageIconNotFound}
      <Text {...FULL_PAGE_TEXT_PROPS}>Page not found</Text>
    </Stack>
  </Center>;
export default NotFound;
