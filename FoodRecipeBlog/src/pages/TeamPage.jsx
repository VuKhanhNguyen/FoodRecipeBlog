import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TeamBanner from "../components/otherBanner/TeamBanner";
import TeamCard from "../components/other/TeamCard";
import InstagramFeed from "../components/home/InstagramFeed";;

const TeamPage = () => {
    return(
        <React.Fragment>
            <Header />
            <TeamBanner />
             <div class="section section-padding">
                <div class="container">
                    <div class="row">
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                        <TeamCard />
                    </div>
                </div>
            </div>
            <InstagramFeed />
            <Footer />
        </React.Fragment>
    );
};

export default TeamPage;