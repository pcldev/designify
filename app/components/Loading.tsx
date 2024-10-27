import type { SpinnerProps } from "@shopify/polaris";
import { BlockStack, Box, Spinner } from "@shopify/polaris";

interface IBlockLoadingProps extends SpinnerProps {
  paddingBlockStart?: any;
  paddingBlockEnd?: any;
}

export default function BlockLoading(props: IBlockLoadingProps) {
  const { size, paddingBlockEnd, paddingBlockStart } = props;
  return (
    <Box
      paddingBlockStart={paddingBlockStart ?? "2800"}
      paddingBlockEnd={paddingBlockEnd ?? "2800"}
    >
      <BlockStack inlineAlign="center" align="center">
        <Spinner size={size ?? "large"} />
      </BlockStack>
    </Box>
  );
}
