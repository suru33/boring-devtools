import { Center, Stack, Text } from "@mantine/core";
import { pageIconHandClick } from "../resources/icons";
import { globalProps } from "../app-sx";
import __ from "../commons/constants";

const Home = () =>
  <Center style={{ height: "100%" }}>
    <Stack align="center" justify="center" spacing="xs">
      {pageIconHandClick}
      <Text {...globalProps.fullPageTextProps}>{__.help.selectTool}</Text>
    </Stack>
  </Center>;
export default Home;
