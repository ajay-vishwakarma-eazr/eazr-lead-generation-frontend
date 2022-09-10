interface ImportMetaEnv {
  readonly VITE_APP_REACT_APP_API_KEY: string
  readonly VITE_APP_REACT_APP_APP_ID: string
  readonly VITE_APP_REACT_APP_AUTH_DOMAIN: string
  readonly VITE_APP_REACT_APP_MEASUREMENT_ID: string
  readonly VITE_APP_REACT_APP_MESSAGING_SENDER_ID: string
  readonly VITE_APP_REACT_APP_PROJECT_ID: string
  readonly VITE_APP_REACT_APP_STORAGE_BUCKET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
