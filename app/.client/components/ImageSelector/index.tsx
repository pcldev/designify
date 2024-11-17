import React from "react";
import {
  Banner,
  BlockStack,
  Box,
  DropZone,
  EmptySearchResult,
  Icon,
  Link,
  List,
  Modal,
  Scrollable,
  Text,
  TextField,
} from "@shopify/polaris";
import { useFetchMediaList } from "./hooks/useFetchMediaList";
import { useCallback, useMemo, useState } from "react";
import ListMediaGrid from "./components/ListMediaGrid";
import { SearchIcon } from "@shopify/polaris-icons";
import { useUploadMedia } from "../ImageSelector/hooks/useUploadMedia";
import { imageFileToBase64 } from "~/utils/file-types";
import lodash from "lodash";
import { useSearchParams } from "@remix-run/react";
import { getMyShopifySubdomainName } from "~/shopify/fns";
import { validateMediaFiles } from "~/utils/file-types/validate-media-file-size";
import { uuid } from "~/utils/uuid";

type IImageQuery = {
  id: string;
  alt: string;
  fileStatus?: string;
  image: {
    originalSrc: string;
    width: number;
    height: number;
  };
  fileErrors?: any;
  mediaErrors?: any;
};

export const validImageTypes = ["image/jpeg", "image/png", "image/webp"];

type BaseImage = {
  url: string;
  width: number;
  height: number;
  altText: string;
};

export type ErrorFile = File & { error: string };

const t = (text: string) => {
  return text;
};

interface IImageSelectorProps {
  active: boolean;
  onSelectImage: (image: IImageQuery[] | null) => void;
  baseImage?: BaseImage[] | null;
  allowMultiple?: boolean;
  onClose?: () => void;
}

const ImageSelector = (props: IImageSelectorProps) => {
  const {
    active,
    onSelectImage,
    onClose,
    baseImage,
    allowMultiple = false,
  } = props;
  const [searchParams] = useSearchParams();
  const shopDomain = searchParams.get("shop");
  const subDomain = getMyShopifySubdomainName(shopDomain || "");

  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [fetchNextPage, setFetchNextPage] = useState(false);

  const baseImageFormatted = baseImage
    ? baseImage.map((image) => {
        const { altText = "", url = "", width = 0, height = 0 } = image;

        return {
          altText,
          image: {
            originalSrc: url,
            width: width,
            height: height,
          },
        };
      })
    : [];

  const [filesUploading, setFilesUploading] = useState<any[]>([]);
  const [imagesSelected, setImagesSelected] =
    useState<any[]>(baseImageFormatted);
  const [rejectedFiles, setRejectedFiles] = useState<ErrorFile[]>([]);

  const hasError = rejectedFiles.length > 0;
  const validMediaFiles = validImageTypes.join(", ");

  const { mediaList, isFetching, deferredQuery } = useFetchMediaList({
    textFieldValue,
    fetchNextPage,
    setFetchNextPage,
  });
  const { uploadBase64Medias } = useUploadMedia();

  const _mediaList = useMemo(() => {
    return lodash.unionBy(
      deferredQuery
        ? mediaList
        : [...filesUploading.filter((file) => !file.isCanceled), ...mediaList],
      "id",
    );
  }, [filesUploading, mediaList, deferredQuery]);

  const onSelect = () => {
    onSelectImage && onSelectImage(imagesSelected);

    onCloseModal();
  };

  const onCloseModal = () => {
    onClose && onClose();
  };

  const onDropHandler = useCallback(
    async (_: File[], _acceptedFiles: File[], _rejectedFiles: File[]) => {
      // Clean rejected files
      setRejectedFiles([]);

      if (_rejectedFiles.length) {
        setRejectedFiles(
          _rejectedFiles.map((file) => ({
            ...file,
            error: `"${file.name}" is not supported. File type must be ${validMediaFiles}.`,
          })),
        );

        return;
      }

      const _files = [];
      let _filesUploading = [];

      const { acceptedFiles, rejectedFiles } =
        await validateMediaFiles(_acceptedFiles);

      if (rejectedFiles.length > 0) {
        setRejectedFiles(rejectedFiles);

        return;
      }

      for (const file of acceptedFiles) {
        const src = (await imageFileToBase64(file)) || "";
        const name = file.name;
        const id = uuid();

        _files.push({ src, name, id });

        _filesUploading.push({
          alt: name,
          id,
          image: { originalSrc: src },
          isUploading: true,
        });
      }

      setFilesUploading(_filesUploading);
      const response = await uploadBase64Medias(_files);

      _filesUploading = response.data.uploadedFiles.map((file: any) => {
        const { originalSrc, width, height } = file.image;

        return {
          id: file.id,
          alt: file.alt,
          image: { originalSrc, width, height },
          isUploading: false,
        };
      });

      setFilesUploading(_filesUploading);
    },
    [uploadBase64Medias, validMediaFiles],
  );

  // Defined the empty state for searching
  const emptySearchMarkup = (
    <div className="ds--d-flex ds--flex-center ds--flex-justify-center h-100">
      <EmptySearchResult
        title={t("no-image-found")}
        withIllustration
        description={t("try-changing-the-search-term")}
      />
    </div>
  );

  const errorMessage = hasError && (
    <Banner title="The following images couldn’t be uploaded:" tone="critical">
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>{`${file.error}`}</List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <Modal
      open={active}
      onClose={onCloseModal}
      title={"Select file"}
      limitHeight
      footer={
        <Link
          removeUnderline
          target="_blank"
          url={`https://admin.shopify.com/store/${subDomain}/content/files`}
        >
          {"Open media files"}
        </Link>
      }
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onCloseModal,
        },
      ]}
      primaryAction={{
        content: "Done",
        onAction: onSelect,
      }}
    >
      <Box padding={"400"}>
        {!deferredQuery && !mediaList?.length && !isFetching ? (
          <Text variant="bodyMd" as="span" tone="subdued">
            {t("no-images-are-found-in-this-store-upload-to-make-a-selection")}
          </Text>
        ) : (
          <TextField
            onChange={setTextFieldValue}
            label="Search images"
            labelHidden
            value={textFieldValue}
            prefix={<Icon source={SearchIcon} tone="base" />}
            placeholder="Search images"
            autoComplete="off"
            clearButton
            onClearButtonClick={() => setTextFieldValue("")}
          />
        )}
      </Box>
      <Scrollable
        style={{ height: "calc(100vh - 323px)", maxHeight: "500px" }}
        onScrolledToBottom={() => setFetchNextPage(true)}
      >
        {!deferredQuery ? (
          <Box paddingInlineStart={"400"} paddingInlineEnd={"400"}>
            <BlockStack gap={"400"}>
              {errorMessage}
              <DropZone
                errorOverlayText="File format is not supported"
                overlayText="Drop files to upload"
                type="image"
                accept={validMediaFiles}
                onDrop={onDropHandler}
                allowMultiple
              >
                <DropZone.FileUpload
                  actionTitle={"Add media"}
                  actionHint="or drag and drop"
                />
              </DropZone>
            </BlockStack>
          </Box>
        ) : null}

        {deferredQuery && !mediaList?.length && !isFetching ? (
          emptySearchMarkup
        ) : (
          <Box padding={"400"}>
            <ListMediaGrid
              isLoading={isFetching}
              files={_mediaList}
              imagesSelected={imagesSelected}
              setImagesSelected={setImagesSelected}
              allowMultiple={allowMultiple}
            />
          </Box>
        )}
      </Scrollable>
    </Modal>
  );
};

export default ImageSelector;
