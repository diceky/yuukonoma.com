import React from "react";
import SlickSlider from "../components/Slider";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Row, Col } from "react-bootstrap";

const Lesson = (props) => {
  const Text = ({ children }) => <span>{children}</span>;
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
      [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    },
    renderText: (text) => {
      const parts = text.split("\n");
      return parts.map((seg, i) => (
        <span key={`seg-${i}`}>
          {i > 0 ? <br key={`br-${i}`} /> : null}
          {seg}
        </span>
      ));
    },
  };

  return (
    <div className="class-wrapper">
      <Row>
        <Col
          sm={{ span: 8, offset: 2 }}
          md={{ span: 8, offset: 2 }}
          xl={{ span: 4, offset: 2 }}
          className="class-text-wrapper"
        >
          <p className="class-title">{props.title}</p>
          {props.time &&
            props.time.map((item, index) => (
              <p className="class-time" key={index}>
                {item}
              </p>
            ))}
          <div className="class-explanation">
            {renderRichText(props.explanation, options)}
          </div>
          {props.isOnline && (
            <p>
              <b>この講座はオンラインで行います。</b>
            </p>
          )}
          {props.fee &&
            renderRichText(props.fee, options)[0].props.children[0] !== " " && (
              <p className="class-fee">
                <span style={{fontWeight: "bold"}}>FEE: </span>{renderRichText(props.fee, options)}
              </p>
            )}
        </Col>
        <Col
          sm={{ span: 8, offset: 2 }}
          md={{ span: 8, offset: 2 }}
          xl={{ span: 4, offset: 0 }}
        >
          <SlickSlider image={props.image} className="class-image-wrapper" />
            <div className="btn-book-wrapper">
              <a
                href={props.link}
                className="btn-book"
                target={props.link==="" ? "_self" : "_blank"}
                rel="noreferrer"
              >
                {props.linkText ? props.linkText : `申し込む`}
              </a>
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default Lesson;
