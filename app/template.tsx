/* A fresh copy of this wraps each page on every visit, so its fade plays each
   time the visitor moves between pages (see .page-arrive in globals.css). The
   header stays put; only the page beneath it changes. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-arrive">{children}</div>;
}
