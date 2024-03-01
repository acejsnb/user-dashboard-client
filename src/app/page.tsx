'use client';
// import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import {userStore} from '@/store';
import Users from './users';
// import Posts from './posts';

export default function Home() {

  return (
      <Users props={userStore} />
  );
}
