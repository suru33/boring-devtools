import { Footer, Group, Text } from "@mantine/core";

const AppFooter = () =>
  <Footer height={30}>
    <Group sx={{ height: "100%" }} position="center" align="center">
      <Text size="xs" color="dimmed">
        {"boring-devtools v1.0.0 • Copyright © 2023 - 2024 Surendra • Licence "}
        <Text component="a" td="underline" target="_blank" href="https://github.com/suru33/boring-devtools/blob/master/LICENSE">MIT</Text>
        {" • "}
        <Text component="a" td="underline" href="https://suru.im" target="_blank">https://suru.im</Text>
      </Text>
    </Group>
  </Footer>;

export default AppFooter;
