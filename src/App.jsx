import Header from './components/Header';
import HeroScroller from './components/HeroScroller';
import BooksSection from './components/sections/BooksSection';
import ProgramsSection from './components/sections/ProgramsSection';
import CurationSection from './components/sections/CurationSection';
import SpaceSection from './components/sections/SpaceSection';
import VisitSection from './components/sections/VisitSection';
import CommunitySection from './components/sections/CommunitySection';
import Footer from './components/sections/Footer';
import './App.css';

export default function App() {
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
    </>
  );
}
