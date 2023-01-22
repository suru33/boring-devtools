import { Center, Stack, Text } from "@mantine/core";
import { pageIconNotFound } from "../resources/icons";
import { FULL_PAGE_TEXT_SIZE, FULL_PAGE_TEXT_WEIGHT } from "../commons/constants";

const NotFound = () =>
  <Center style={{ height: "100%" }}>
    <Stack align="center" justify="center" spacing="xs" >
      {pageIconNotFound}
      <Text
        size={FULL_PAGE_TEXT_SIZE}
        weight={FULL_PAGE_TEXT_WEIGHT}
        ta="center">
          Page not found
      </Text>
    </Stack>
  </Center>;
export default NotFound;
