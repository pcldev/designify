import { useNavigate } from "@remix-run/react";
import { Card, EmptyState } from "@shopify/polaris";
import { uuid } from "~/utils/uuid";

function EmptyPage() {
  const navigate = useNavigate();

  return (
    <Card>
      <EmptyState
        heading="Start building your pages on online store"
        action={{
          content: "Create page",
          onAction: () => {
            const _id = uuid();

            navigate(`/pages/${_id}`);
          },
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        Customize the settings for each page to make them even more effective
        and attract more customers.
      </EmptyState>
    </Card>
  );
}

export default EmptyPage;
