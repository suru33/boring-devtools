import { Center, Stack, Text } from "@mantine/core";
import { pageIconHandClick } from "../resources/icons";
import { FULL_PAGE_TEXT_SIZE } from "../commons/constants";

const Home = () =>
  <Center style={{ height: "100%" }}>
    <Stack align="center" justify="center" spacing="xs">
      {pageIconHandClick}
      <Text size={FULL_PAGE_TEXT_SIZE} weight={700}>Select a tool from the sidebar</Text>
    </Stack>
  </Center>;
export default Home;
