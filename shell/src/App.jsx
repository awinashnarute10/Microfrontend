import React, { Suspense, useState } from 'react';

const Home    = React.lazy(() => import('home/Home'));
const Product = React.lazy(() => import('product/Product'));
const Cart    = React.lazy(() => import('cart/Cart'));
const Profile = React.lazy(() => import('profile/Profile'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <p>Failed to load this section. Make sure the remote app is running.</p>;
    }
    return this.props.children;
  }
}

export default function App() {
  const [page, setPage] = useState('home');

  const pages = { home: <Home />, product: <Product />, cart: <Cart />, profile: <Profile /> };

  return (
    <div>
      <nav>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('profile')}>Profile</button>
        <button onClick={() => setPage('product')}>Products</button>
        <button onClick={() => setPage('cart')}>Cart</button>
      </nav>
      <div style={{ padding: 24 }}>
        <ErrorBoundary key={page}>
          <Suspense fallback={<p>Loading...</p>}>
            {pages[page]}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
