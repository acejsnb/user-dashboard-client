'use client';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import {UsersStore} from '@/store';
import Users from './users';
import Posts from './posts';

const userStore = new UsersStore();

export default function Home() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Users props={userStore} />} />
              <Route path="/posts/:id" element={<Posts props={userStore} />} />
          </Routes>
      </Router>
  );
}
