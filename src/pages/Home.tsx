import { Center, Stack, Text } from "@mantine/core";
import { pageIconHandClick } from "../resources/icons";
import { FULL_PAGE_TEXT_SIZE, FULL_PAGE_TEXT_WEIGHT } from "../commons/constants";

const Home = () =>
  <Center style={{ height: "100%" }}>
    <Stack align="center" justify="center" spacing="xs">
      {pageIconHandClick}
      <Text
        size={FULL_PAGE_TEXT_SIZE}
        weight={FULL_PAGE_TEXT_WEIGHT}
        ta="center">
          Select a tool from the sidebar
      </Text>
    </Stack>
  </Center>;
export default Home;
