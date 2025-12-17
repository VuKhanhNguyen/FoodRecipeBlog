import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import InstagramFeed from "../components/home/InstagramFeed";
import AuthorsBanner from "../components/otherBanner/AuthorsBanner";
import AuthorsCard from "../components/other/AuthorsCard";

const ListAuthorsPage = () => {
  return (
    <React.Fragment>
      <Header />
      <AuthorsBanner />
      <div class="container">
        <div class="row">
          <AuthorsCard />
          <AuthorsCard />
          <AuthorsCard />
          <AuthorsCard />
          <AuthorsCard />
          <AuthorsCard />
        </div>
      </div>
      <InstagramFeed />
      <Footer />
    </React.Fragment>
  );
};
export default ListAuthorsPage;
