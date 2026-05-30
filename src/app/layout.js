import "./globals.css";

export const metadata = {
  title: "Serena – Acompañamiento para mujeres",
  description: "Acompañamiento digital para mujeres que usan pastillas anticonceptivas, con información validada por ginecólogos y basada en MedlinePlus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
