import EnglishDesktopHeader from "../components/EnglishDesktopHeader";

export default function EnglishLayout({ children }) {
  return (
    <>
      <EnglishDesktopHeader />
      {children}
    </>
  );
}