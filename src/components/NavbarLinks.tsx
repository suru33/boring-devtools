import { Link, useLocation } from "react-router-dom";
import { Group, MantineTheme, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { Tool } from "./tools";

interface NavbarLinkProps {
  parentPath: string,
  tool: Tool
}

interface NavBarColors {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  background?: any,
  hover?: string,
  text?: string
}
const NavbarLink = (props: NavbarLinkProps) => {
  const location = useLocation();
  const { parentPath, tool } = props;
  const path = `${parentPath}/${tool.path}`;
  const highlight = location.pathname === `/${path}`;

  const getColors = (theme: MantineTheme, hover = false): NavBarColors => {
    const darkHoverColor = theme.colors.dark[6];
    const darkHighlightColor =  theme.colors.dark[5];
    const darkTextColor = theme.colors.gray[1];
    const lightHoverColor =  theme.colors.gray[0];
    const lightHighlightColor =  theme.colors.gray[2];
    const lightTextColor = theme.black;
    switch (true) {
      case theme.colorScheme === "dark" && highlight && hover:
        return { background: darkHighlightColor, hover: darkHighlightColor, text: darkTextColor };
      case theme.colorScheme === "dark" && highlight:
        return { background: darkHighlightColor, hover: darkHoverColor, text: darkTextColor };
      case theme.colorScheme === "dark":
        return { background: theme.activeStyles.backgroundColor, hover: darkHoverColor, text: darkTextColor };
      case theme.colorScheme === "light" && highlight && hover:
        return { background: lightHighlightColor, hover: lightHighlightColor, text: lightTextColor };
      case theme.colorScheme === "light" && highlight:
        return { background: lightHighlightColor, hover: lightHoverColor, text: lightTextColor };
      case theme.colorScheme === "light":
        return { background: theme.activeStyles.backgroundColor, hover: lightHoverColor, text: lightTextColor };
    }
    return {}; // should never reach
  };

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        background: getColors(theme).background,
        color: getColors(theme).text,
        "&:hover": { backgroundColor: getColors(theme, true).hover }
      })}
      component={Link}
      to={path}>
      <Group>
        <ThemeIcon color={tool.color} variant="light">{tool.icon}</ThemeIcon>
        <Text size="sm">{tool.label}</Text>
      </Group>
    </UnstyledButton>
  );
};

interface NavbarLinksProps {
  parentPath: string,
  tools: Tool[]
}

const NavbarLinks = (props: NavbarLinksProps) => {
  const { parentPath, tools } = props;
  const links = tools.map((tool) => <NavbarLink parentPath={parentPath} tool={tool} key={tool.label}/>);
  return <div>{links}</div>;
};

export default NavbarLinks;
