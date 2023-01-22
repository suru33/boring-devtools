import { Center, Stack, Text } from "@mantine/core";
import { pageIconNotFound } from "../resources/icons";
import { globalProps } from "../app-sx";
import __ from "../commons/constants";

const NotFound = () =>
  <Center style={{ height: "100%" }}>
    <Stack align="center" justify="center" spacing="xs">
      {pageIconNotFound}
      <Text {...globalProps.fullPageTextProps}>{__.errmsg.pageNotFound}</Text>
    </Stack>
  </Center>;
export default NotFound;
