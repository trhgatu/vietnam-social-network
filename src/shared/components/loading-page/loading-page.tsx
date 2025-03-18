import React from 'react';
import Loader from '@/shared/components/loader/loader';
import './loading-page.scss'

export default function LoadingPage() {
  return (
    <div className="loading-page">
      <Loader />
      <div className="loading-text">
        <span>Loading</span>
        <span className="dots">...</span>
      </div>
    </div>
  );
}