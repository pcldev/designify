import { useNavigate } from "@remix-run/react";
import {
  Card,
  Text,
  Box,
  Divider,
  InlineStack,
  Button,
} from "@shopify/polaris";
import { getDistanceToNow } from "~/bootstrap/fns/time";

function RecentPages(props: { pages: { items: any[] } }) {
  const items = props.pages.items;

  const navigate = useNavigate();

  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Recent pages
      </Text>
      <Box paddingBlock="200">
        <Text as="p" variant="bodyMd">
          This list only shows the most recently edited pages. Quickly access
          any pages shown below to pick up where you left off or preview your
          finished work.
        </Text>
      </Box>
      <Box>
        <Divider />

        {items.map((item) => {
          return (
            <Box key={item._id}>
              <Box paddingBlock={"400"}>
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="p" variant="bodyMd">
                    {item.title}
                  </Text>

                  <InlineStack blockAlign="center" gap={"200"}>
                    <Text as="p" variant="bodySm">
                      {getDistanceToNow(item.updatedAt)}
                    </Text>
                    <Button
                      onClick={() => {
                        navigate(`/pages/${item._id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </InlineStack>
                </InlineStack>
              </Box>
              <Divider />
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}

export default RecentPages;
