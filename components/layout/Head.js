import NextHead from "next/head";

export default function Head({ title = "" }) {
  return (
    <NextHead>
      <title>
        {title} {title ? " | " : ""}Frameworks CA
      </title>
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}
