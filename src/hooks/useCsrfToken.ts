export default function useCsrfToken() {
  const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]') as Element;
  const csrfToken = csrfTokenMeta.getAttribute('content') ?? '';
  const setCsrfToken = (csrfToken: string) => {
    csrfTokenMeta.setAttribute('content', csrfToken);
  }
  return [csrfToken, setCsrfToken] as const;
}