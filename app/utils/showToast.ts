interface ToastOptions {
  /**
   * The length of time in milliseconds the toast message should persist.
   * @defaultValue 5000
   */
  duration?: number;
  /**
   * Display an error-styled toast.
   * @defaultValue false
   */
  isError?: boolean;
  /**
   * Content of an action button.
   */
  action?: string;
  /**
   * Callback fired when the action button is clicked.
   */
  onAction?: () => void;
  /**
   * Callback fired when the dismiss icon is clicked
   */
  onDismiss?: () => void;
}

export function showToast(message: string, opts?: ToastOptions) {
  const _shopify = window.opener?.shopify ?? window.shopify;

  _shopify.toast.show(message, opts);
}

export function hideToast(id: string) {
  const _shopify = window.opener?.shopify ?? window.shopify;

  _shopify.toast.hide(id);
}
