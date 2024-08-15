import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, title, description, keywords, author, canonicalUrl }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>
      <Navbar />
      <main style={{ width: '100%',  minHeight: 'calc(100vh - 6rem)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - Shop Now",
  description: "MERN stack project",
  keywords: "mern, react, node, mongodb",
  author: "Rahul",
  canonicalUrl: "http://mysite.com/example"
};

export default Layout;
