import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DraftProvider } from './components/DraftProvider';
import { NotFoundState } from './components/States';
import { CreatureLab } from './pages/CreatureLab';
import { EntryPage } from './pages/EntryPage';
import { ArmorForgePage, WeaponForgePage } from './pages/ForgePages';
import { GuidePage } from './pages/GuidePage';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { TypeList } from './pages/TypeList';

export function App() {
  return (
    <DraftProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="buscar" element={<Search />} />
          <Route path="guias/:slug" element={<GuidePage />} />
          <Route path="laboratorio-oroboros" element={<CreatureLab />} />
          <Route path="forja-de-armas" element={<WeaponForgePage />} />
          <Route path="forja-de-armaduras" element={<ArmorForgePage />} />
          <Route path=":tipo" element={<TypeList />} />
          <Route path=":tipo/:slug" element={<EntryPage />} />
          <Route path="*" element={<NotFoundState />} />
        </Route>
      </Routes>
    </DraftProvider>
  );
}
