import { Fragment } from "react";

/**
 * Splits a heading into words so each can rise out of a clipped line (animated by Story), and
 * sets the whole heading on a purple marker-style highlight. Server-safe, and the text still
 * reads normally for assistive technology.
 */
export default function Words({ text }: { text: string }) {
  return (
    <span className="zm-hl">
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="zm-w">
            <span className="zm-wi">{w}</span>
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}
