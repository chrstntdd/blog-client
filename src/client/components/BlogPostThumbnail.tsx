import * as React from 'react';
import styles from './blogPostThumbnail.scss';
import { Link } from 'react-router-dom';

interface PropTypes {
  title: String;
  author: String;
  readTime: Number;
  description: String;
  tags: [String];
  date: Date;
  image?: String;
}

const BlogPostThumbnail: React.SFC<PropTypes> = ({
  title,
  description,
  image,
  readTime,
  author,
  date,
  tags
}) => (
  <article className={styles.articleCard}>
    <header>
      <h2>{title}</h2>
      <p>by {author}</p>
      <p>~ {readTime} minute read</p>
      <p>{new Date(date).toString()}</p>
      <ul>
        {tags.map((tag, i) => {
          return <li key={i}>
            <Link to={`/blog/${tag}`}>#{tag}</Link>
          </li>;
        })}
      </ul>
      <figure>
        <img src={image}/>
      </figure>
    </header>
    <p>{description}</p>
  </article>
);

export default BlogPostThumbnail;
