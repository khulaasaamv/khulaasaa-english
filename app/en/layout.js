import EnglishDesktopHeader from "../components/EnglishDesktopHeader";
import EnglishThemeBoot from "../components/EnglishThemeBoot";

export default function EnglishLayout({ children }) {
  return (
    <>
      <EnglishThemeBoot />
      <EnglishDesktopHeader />
      {children}
    </>
  );
}