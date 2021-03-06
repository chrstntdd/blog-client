import * as React from 'react';

const Html = ({ content, state }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>GitHunt</title>
    </head>
    <body>
      <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
      <div id="footer">
        <ul>
          <li>
            Fork on <a href="https://github.com/apollostack/GitHunt">Github</a>
          </li>
          <li>
            This is an <a href="http://www.apollostack.com/">Apollo</a> example
            app
          </li>
        </ul>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state)};`
        }}
        charSet="UTF-8"
      />
      <script src="/static/bundle.js" charSet="UTF-8" />
    </body>
  </html>
);


export default Html;
