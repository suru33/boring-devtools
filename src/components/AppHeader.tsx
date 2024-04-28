import { Link } from "react-router-dom";
import { ActionIcon, Button, ColorScheme, Group, Header, Text, UnstyledButton } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { useSpotlight } from "@mantine/spotlight";
import AppLogo from "../resources/AppLogo";
import { iconMoonStars, iconSearch, iconSun } from "../resources/icons";
import { fontWeight } from "../app-sx";
import __ from "../commons/constants";

interface AppHeaderProps {
  colorScheme: ColorScheme,
  colorSchemeToggleFn: (value?: ColorScheme) => void
}

const AppHeader = (props: AppHeaderProps) => {
  const spotlight = useSpotlight();
  const os = useOs();
  const [ searchShortcut, themeShortcut ] = os === "ios" || os === "macos" ?
    __.labels.shortcuts.mac : __.labels.shortcuts.others;
  const { colorScheme, colorSchemeToggleFn } = props;
  return <Header height={60}>
    <Group sx={{ height: "100%" }} px={20} position="apart">
      <Group>
        <UnstyledButton component={Link} to={"/home"}>
          <Group>
            <AppLogo size={50} colorScheme={colorScheme}/>
            <Text size="xl" weight={fontWeight.extraBold}>{__.settings.appName}</Text>
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
          {`${__.labels.search} (${searchShortcut})`}
        </Button>
        <ActionIcon
          title={`${__.labels.toggleColorScheme} (${themeShortcut})`}
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
