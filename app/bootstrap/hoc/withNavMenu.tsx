import { Outlet } from "@remix-run/react";
import { NavMenu } from "@shopify/app-bridge-react";
import type { ComponentClass, FunctionComponent } from "react";
import { useMemo } from "react";
import { isNavMenuItemEnabled } from "~/bootstrap/app-config";
import CustomRemixLink from "~/components/CustomRemixLink";

export default function withNavMenu(
  Component?: FunctionComponent<any> | ComponentClass<any>,
) {
  return function WithNavMenu(props: any) {
    // Define nav menu items.
    const navMenuItems: { [key: string]: string } = useMemo(
      () => ({
        "/dashboard": "Dashboard",
        "/pages": "Pages",
        "/preferences": "Preferences",
      }),
      [],
    );

    // Filter enabled nav menu items.
    const filteredNavMenuItems = useMemo(
      () =>
        Object.keys(navMenuItems).filter((path) => isNavMenuItemEnabled(path)),
      [navMenuItems],
    );

    return (
      <>
        <div style={{ display: "none" }}>
          <NavMenu>
            {filteredNavMenuItems.map((path) => (
              <CustomRemixLink
                key={path}
                to={path}
                rel={path === "/dashboard" ? "home" : undefined}
              >
                {navMenuItems[path]}
              </CustomRemixLink>
            ))}
          </NavMenu>
        </div>

        {Component ? <Component {...props} /> : <Outlet />}
      </>
    );
  };
}
