import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import { Helmet } from "react-helmet";
import { Row, Col } from "react-bootstrap";
import SubscriptionContent from "../components/SubscriptionContent";
import { useStaticQuery, graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

const Subscription = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulSubscription {
        nodes {
          fee
          intro {
            raw
          }
          explanation {
            raw
          }
          contents {
            explanation {
              raw
            }
            image {
              gatsbyImageData
              file {
                fileName
              }
            }
            title
            subtitle
          }
          link
        }
      }
    }
  `);

  const [windowBottom, setWindowBottom] = useState(0);
  const [docHeight, setDocHeight] = useState(0);
  const [popIn, setPopIn] = useState(false);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.onscroll = () => {
        setWindowBottom(window.pageYOffset + window.innerHeight);
        setDocHeight(window.document.body.offsetHeight);
      };
    }
  }, []);

  if (docHeight - windowBottom < 100 && popIn === false) setPopIn(true);
  else if (docHeight - windowBottom >= 100 && popIn === true) setPopIn(false);

  const Text = ({ children }) => children;
  const InlineLink = ({ link, children }) => (
    <a href={link} className="class-link" target="_blank" rel="noreferrer">
      {children}
    </a>
  );

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [INLINES.HYPERLINK]: ({ data }, children) => (
        <InlineLink link={data.uri}>{children}</InlineLink>
      ),
    },
  };

  return (
    <Layout popIn={popIn}>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,700&display=swap&subset=japanese"
          rel="stylesheet"
        />
      </Helmet>
      <SEO title="Subscription" />
      <Row className="section-subscriptionAbout">
        <Col
          xs={12}
          sm={{ span: 11, offset: 1 }}
          md={{ span: 11, offset: 1 }}
          lg={{ span: 7, offset: 1 }}
        >
          <p className="subscription-title">
            ???????????????????????????
            <br />
            ?????????????????????
          </p>
          <p className="subscription-explanation">
            {renderRichText(
              data.allContentfulSubscription.nodes[0].intro,
              options
            )}
          </p>
          <a
            href={data.allContentfulSubscription.nodes[0].link}
            className="btn-subscription"
            target="_blank"
            rel="noreferrer"
          >
            ??????????????????????????????????????????
          </a>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={4}
          className="subscription-icon-wrapper"
        >
          <p className="subscription-icon">???????????????</p>
        </Col>
      </Row>
      <Row className="section-subscriptionContents">
        <Col
          sm={12}
          md={12}
          lg={12}
          className="subscriptionContents-title-wrapper"
        >
          <div className="subscriptionContents-title-line"></div>
          <p className="subscriptionContents-title">????????????????????????????????????</p>
          <div className="subscriptionContents-title-line"></div>
        </Col>
        <Col
          sm={12}
          md={12}
          lg={12}
          className="subscriptionContents-title-wrapper"
        >
          <p className="subscriptionContents-explanation">
            {renderRichText(
              data.allContentfulSubscription.nodes[0].explanation,
              options
            )}
          </p>
        </Col>
        {data.allContentfulSubscription.nodes[0].contents.map(
          ({ title, subtitle, explanation, image }, index) => (
            <Col
              sm={12}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 4, offset: 0 }}
              className="subscriptionContent-wrapper"
              key={index}
            >
              <SubscriptionContent
                title={title}
                subtitle={subtitle}
                explanation={explanation}
                image={image}
                index={index}
                key={index}
              />
            </Col>
          )
        )}
        <Col sm={12} className="subscriptionContents-fee-wrapper">
          <p className="subscriptionContents-fee-pretext">???????????????</p>
          <span className="subscriptionContents-fee-small">??????</span>
          <span className="subscriptionContents-fee-large">
            {data.allContentfulSubscription.nodes[0].fee}
          </span>
          <span className="subscriptionContents-fee-small">???</span>
        </Col>
      </Row>
      <Row className="section-subscriptionWarning">
        <Col
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 8, offset: 2 }}
          className="subscriptionWarning-wrapper"
        >
          <p className="subscription-warning-title">????????????</p>
          <ul className="subscription-warning-list">
            <li className="subscription-warning-content">
              ??????????????????????????????????????????????????????
            </li>
            <li className="subscription-warning-content">
              MOSH???????????????????????????????????????????????????????????????
            </li>
            <li className="subscription-warning-content">
              ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </li>
            <li className="subscription-warning-content">
              ???????????????????????????????????????????????????
            </li>
          </ul>
          <a
            href={data.allContentfulSubscription.nodes[0].link}
            className="subscription-CTA"
            target="_blank"
            rel="noreferrer"
          >
            ??????????????????????????????????????????
          </a>
        </Col>
      </Row>
    </Layout>
  );
};

export default Subscription;
