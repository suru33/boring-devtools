import { Link } from "react-router-dom";
import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { Tool } from "./tools";

const NavbarLink = (props: {parentPath: string, tool: Tool}) => {
  const { parentPath, tool } = props;
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      component={Link}
      to={`${parentPath}/${tool.path}`}
    >
      <Group>
        <ThemeIcon color={tool.color} variant="light">
          {tool.icon}
        </ThemeIcon>

        <Text size="sm">{tool.label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const NavbarLinks = (props: {parentPath: string, tools: Tool[]}) => {
  const { parentPath, tools } = props;
  const links = tools.map((tool) =>
    <NavbarLink parentPath={parentPath} tool={tool} key={tool.label} />
  );
  return <div>{links}</div>;
};

export default NavbarLinks;
