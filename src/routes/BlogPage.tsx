import * as React from 'react';
import styles from './blogPage.scss';

import BlogPostThumbnail from '../components/BlogPostThumbnail';

interface PropTypes {}
interface StateType {}

const WORDS_PER_MINUTE = 250;
const image =
  'https://images.unsplash.com/photo-1496374200594-218d93021c8c?dpr=1&auto=compress,format&fit=crop&w=1950&h=&q=80&cs=tinysrgb&crop=';

const tags = ['bitch', 'u', 'better stop'];
/* read time is the word count of the article and a constant words per minute */
export default class BlogPage extends React.Component<PropTypes, StateType> {
  render() {
    return (
      <div className={styles.wrapper} id="blog-container">
          <h1>BLOG PAGE</h1>
        <section >
          {/* map through the blog posts sent to component */}
          <BlogPostThumbnail
            title={'nucc'}
            description={'NUUUUUC'}
            readTime={20 / WORDS_PER_MINUTE}
            author={'Christian Todd'}
            date={new Date().getTime()}
            tags={tags}
            image={image}
          />
        </section>
        <aside>
          <h3>Topics</h3>
          <ul>
            <li>Javascript</li>
            <li>Elm</li>
            <li>Front End</li>
            <li>Design</li>
          </ul>
        </aside>
      </div>
    );
  }
}
