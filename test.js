import React, { useState } from 'react';
import styled from 'styled-components';

const OverviewSection = styled.section`
  padding: 9.6rem 0;
  background-color: var(--color-primary-lighter);

  .container {
    &.center-text {
      text-align: center;
    }
  }

  .subheading {
    /* Your subheading styles here */
  }

  .heading--secondary {
    /* Your secondary heading styles here */
  }
`;

const OverviewContainer = styled.div`
  background-color: #fff;
  border-radius: 11px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TabButton = styled.button`
  color: #fff;
  margin-right: 2.5rem;
  transform: translateY(-25%);
  /* Additional styles based on class */
`;

const ActiveTabButton = styled(TabButton)`
  background-color: var(--color-primary-darker);
  transform: translateY(-45%);
`;

const ContentContainer = styled.div`
  display: none;
  padding: 2.5rem 7rem 6.5rem 7rem;
`;

const ActiveContentContainer = styled(ContentContainer)`
  display: grid;
  grid-template-columns: 7rem 1fr;
  column-gap: 3rem;
  row-gap: 0.5rem;
`;

const Header = styled.p`
  color: var(--color-black-300);
  line-height: 1.5;
  font-size: 2.4rem;
  font-weight: 500;
  align-self: center;
`;

const Text = styled.p`
  color: var(--color-black-400);
  font-size: 1.8rem;
  line-height: 1.8;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.4rem;
  width: 6.4rem;
  border-radius: 50%;
`;

const Icon = styled.i`
  font-size: 2.4rem;
`;

export {
  OverviewSection,
  OverviewContainer,
  TabContainer,
  TabButton,
  ActiveTabButton,
  ContentContainer,
  ActiveContentContainer,
  Header,
  Text,
  IconContainer,
  Icon,
};

function OverviewSection() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = tabIndex => {
    setActiveTab(tabIndex);
  };

  return (
    <section className="section section__overview" id="section--5">
      <div className="container center-text">
        <span className="subheading">Overview</span>
        <h2 className="heading--secondary">
          Immerse yourself in the captivating gaming world
        </h2>
      </div>

      <div className="container">
        <div className="overview">
          <div className="overview__tab-container">
            <button
              className={`btn overview__tab overview__tab--1 ${
                activeTab === 1 && 'overview__tab--active'
              }`}
              data-tab="1"
              onClick={() => handleTabClick(1)}
            >
              <span>01</span>Values
            </button>
            <button
              className={`btn overview__tab overview__tab--2 ${
                activeTab === 2 && 'overview__tab--active'
              }`}
              data-tab="2"
              onClick={() => handleTabClick(2)}
            >
              <span>02</span>Studio
            </button>
            <button
              className={`btn overview__tab overview__tab--3 ${
                activeTab === 3 && 'overview__tab--active'
              }`}
              data-tab="3"
              onClick={() => handleTabClick(3)}
            >
              <span>03</span>Production
            </button>
          </div>

          <div
            className={`overview__content overview__content--1 ${
              activeTab === 1 && 'overview__content--active'
            }`}
          >
            <div className="overview__icon overview__icon--1">
              <i className="fa-solid fa-tv"></i>
            </div>
            <p className="overview__header">
              A genuine commitment to the well-being of every individual
            </p>
            <p className="overview__text">
              In addition to crafting extraordinary gaming experiences, SIE is
              dedicated to fostering inclusive communities for both our players
              and staff. Furthermore, we are actively acknowledging and
              addressing our role in minimizing the environmental impact of our
              products.
            </p>
          </div>

          <div
            className={`overview__content overview__content--2 ${
              activeTab === 2 && 'overview__content--active'
            }`}
          >
            <div className="overview__icon overview__icon--2">
              <i className="fa-solid fa-headphones-simple"></i>
            </div>
            <h5 className="overview__header">
              An unwavering dedication to innovation and excellence
            </h5>
            <p className="overview__text">
              This institution has been a defining force in the world of gaming
              across generations. Our network of studios and teams extends
              globally, collectively propelling the advancement of gaming and
              its positive influence on the lives of individuals.
            </p>
          </div>

          <div
            className={`overview__content overview__content--3 ${
              activeTab === 3 && 'overview__content--active'
            }`}
          >
            <div className="overview__icon overview__icon--3">
              <i className="fa-solid fa-mobile-screen-button"></i>
            </div>
            <h5 className="overview__header">
              Steadfast commitment to pushing the boundaries of innovation
            </h5>
            <p className="overview__text">
              PayStation Productions takes the emotive storytelling and
              immersive gameplay experiences inherent in PayStation Studios and
              intricately weaves that shared DNA into compelling movies, TV
              shows, and animations.These adaptations come to life on both the
              big and small screens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
