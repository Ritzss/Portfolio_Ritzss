import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beyond the Code | Ritanshu Babuta",
  description:
    "A look beyond software at Ritanshu Babuta's interests, certifications, things he is learning, and the ideas that keep him curious.",
};

export default function BeyondLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}