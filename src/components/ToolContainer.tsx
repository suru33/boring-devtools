import { ReactNode } from "react";
import { Box, Title } from "@mantine/core";

type ToolContainerProps = {
  title: string,
  children: ReactNode
}

const ToolContainer = ({ title, children }: ToolContainerProps) =>
  <Box>
    <Title order={2} align="center" sx={{ marginBottom: 20 }}>{title}</Title>
    {children}
  </Box>;
export default ToolContainer;
