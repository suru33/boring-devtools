import { Link } from "react-router-dom";
import { ActionIcon, Button, ColorScheme, Group, Header, Text, UnstyledButton } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { useSpotlight } from "@mantine/spotlight";
import AppLogo from "../resources/AppLogo";
import { iconMoonStars, iconSearch, iconSun } from "../resources/icons";

interface AppHeaderProps {
  colorScheme: ColorScheme,
  colorSchemeToggleFn: (value?: ColorScheme) => void
}

const AppHeader = (props: AppHeaderProps) => {
  const spotlight = useSpotlight();
  const os = useOs();
  const [ searchShortcut, themeShortcut ] = os === "ios" || os === "macos" ? [ "⌘ + K", "⌘ + J" ] : [ "Ctrl + K", "Ctrl + J" ];
  const { colorScheme, colorSchemeToggleFn } = props;
  return <Header height={60}>
    <Group sx={{ height: "100%" }} px={20} position="apart">
      <Group>
        <UnstyledButton component={Link} to={"/home"}>
          <Group>
            <AppLogo size={50} colorScheme={colorScheme}/>
            <Text size="xl" weight={900}>boring-devtools</Text>
          </Group>
        </UnstyledButton>
      </Group>
      <Group>
        <Button
          size="xs"
          variant="subtle"
          leftIcon={iconSearch}
          color="gray"
          onClick={() => spotlight.openSpotlight()}>
          {`Search (${searchShortcut})`}
        </Button>
        <ActionIcon
          title={`Toggle color scheme (${themeShortcut})`}
          variant="default"
          size={30}
          onClick={() => colorSchemeToggleFn()}>
          {colorScheme === "dark" ? iconSun : iconMoonStars}
        </ActionIcon>
      </Group>
    </Group>
  </Header>;
};

export default AppHeader;
