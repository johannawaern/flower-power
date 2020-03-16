import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'
import { useState } from 'react'

const Detail = (props) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([...props.comments].reverse())

  const postComment = async (event) => {
    event.preventDefault()
    fetch(
      `https://flowers-mock-data.firebaseio.com/comments/johannawaern/${props.id}.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          comment
        })
      }
    ).then(() => {
      setComments((previousComments) => [comment, ...previousComments])
      setComment('')
    })
  }

  return (
    <Layout>
      <main>
        {props.flower.cover_image ? (
          <img src={props.flower.cover_image} />
        ) : (
          <img src='/placeholder.png' alt='placeholder' />
        )}
        <h1>{props.flower.common_name}</h1>

        <div className='flowerInfo'>
          <em>Latin Name: {props.flower.latin_name}</em>
          <p>Blooming Season: {props.flower.blooming_season}</p>
          <p>Good to know: {props.flower.notes}</p>
        </div>

        <h2>Leave a comment</h2>
        <form onSubmit={postComment}>
          <input
            id='comment'
            type='text'
            value={comment}
            required
            onChange={(event) => setComment(event.target.value)}
          />
          <button>Post</button>
        </form>

        <h2>Comments</h2>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, id) => (
              <li key={id}>"{comment}"</li>
            ))}
          </ul>
        ) : (
          <p>Be the first to comment on this beauty!</p>
        )}

        <style jsx>{`
          h1,
          h2 {
            margin-bottom: 0.3em;
          }

          img {
            width: 100%;
            height: 400px;
            object-fit: cover;
          }

          .flowerInfo {
            margin-bottom: 3em;
          }

          p {
            margin: 0.5em 0;
          }

          ul {
            list-style: none;
            line-height: 25px;
            font-family: 'Open Sans Condensed';
          }

          input[type='text'] {
            font: 1em 'Open Sans Condensed';
          }

          button {
            margin-left: 1em;
            font: 1em 'Open Sans Condensed';
            border-radius: 10px;
            padding: 2px 18px;
            background-color: #999966;
            color: white;
            border: none;
          }
        `}</style>
      </main>
    </Layout>
  )
}

Detail.getInitialProps = async function(context) {
  const { id } = context.query

  const [flower, comments] = await Promise.all([
    fetch(
      `https://flowers-mock-data.firebaseio.com/flowers/${id}.json`
    ).then((r) => r.json()),
    fetch(
      `https://flowers-mock-data.firebaseio.com/comments/johannawaern/${id}.json`
    )
      .then((r) => r.json())
      .then((json) =>
        json ? Object.entries(json).map(([id, object]) => object.comment) : []
      )
  ])

  return { flower, comments, id }
}

export default Detail
