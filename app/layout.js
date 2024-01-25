import ClientLayout from "./ClientLayout"
import FathomComponent from "./components/fathom";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FathomComponent />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}



