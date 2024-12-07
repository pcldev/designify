import { useLocation, useNavigate } from "@remix-run/react";
import { ActionList, Box, Card, Icon, Text } from "@shopify/polaris";
import {
  ChartVerticalFilledIcon,
  ProfileIcon,
  ThemeEditIcon,
} from "@shopify/polaris-icons";
import { useEffect, useMemo } from "react";

const path = "/settings";

function NavigationSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const navigationItems = useMemo(
    () => [
      {
        content: "Account",
        icon: ProfileIcon,
        url: `${path}/account`,
      },
      {
        content: "Analytics",
        icon: ChartVerticalFilledIcon,
        url: `${path}/analytics`,
      },
      {
        content: "Theme app extension",
        icon: ThemeEditIcon,
        url: `${path}/theme-app-extension`,
      },
    ],
    [],
  );

  useEffect(() => {
    // Set default to first navigation item
    if (!navigationItems.filter((item) => item.url === pathname)[0]) {
      navigate(navigationItems[0].url);
    }
  }, [pathname, navigationItems, navigate]);

  return (
    <Box paddingBlockStart={"400"}>
      <Card padding="0" roundedAbove="sm">
        <Box
          background="bg-surface-tertiary"
          padding={"300"}
          borderBlockEndWidth="025"
          borderColor="border"
        >
          <Text variant="headingMd" as="h1">
            {"Preferences"}
          </Text>
        </Box>

        <ActionList
          actionRole="menuitem"
          items={navigationItems.map((item) => {
            const active = item.url === pathname;

            return {
              content: item.content,
              prefix: <Icon source={item.icon} />,
              active,
              onAction: () => {
                if (active) {
                  return false;
                }

                navigate(item.url);
              },
            };
          })}
        />
      </Card>
    </Box>
  );
}

export default NavigationSettings;
