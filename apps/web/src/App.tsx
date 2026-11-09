import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotFoundState } from './components/States';
import { EntryPage } from './pages/EntryPage';
import { GuidePage } from './pages/GuidePage';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { TypeList } from './pages/TypeList';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="buscar" element={<Search />} />
        <Route path="guias/:slug" element={<GuidePage />} />
        <Route path=":tipo" element={<TypeList />} />
        <Route path=":tipo/:slug" element={<EntryPage />} />
        <Route path="*" element={<NotFoundState />} />
      </Route>
    </Routes>
  );
}
