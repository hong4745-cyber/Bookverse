import Header from './components/Header';
import HeroScroller from './components/HeroScroller';
import BooksSection from './components/sections/BooksSection';
import ProgramsSection from './components/sections/ProgramsSection';
import CurationSection from './components/sections/CurationSection';
import SpaceSection from './components/sections/SpaceSection';
import VisitSection from './components/sections/VisitSection';
import CommunitySection from './components/sections/CommunitySection';
import CommunityPage from './components/CommunityPage';
import MyPage from './components/MyPage';
import FloatingActions from './components/FloatingActions';
import Footer from './components/sections/Footer';
import './App.css';

export default function App() {
  if (window.location.pathname === '/my') {
    return <MyPage />;
  }

  if (window.location.pathname === '/community') {
    return (
      <>
        <CommunityPage />
        <FloatingActions />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <HeroScroller />
        <BooksSection />
        <ProgramsSection />
        <CurationSection />
        <SpaceSection />
        <VisitSection />
        <CommunitySection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
