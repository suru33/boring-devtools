import { ReactNode } from "react";
import { Title } from "@mantine/core";

type ToolContainerProps = {
  title: string,
  children: ReactNode
}

const ToolContainer = ({ title, children }: ToolContainerProps) =>
  <>
    <Title order={2} align="center" sx={{ marginBottom: 20 }}>{title}</Title>
    {children}
  </>;
export default ToolContainer;
