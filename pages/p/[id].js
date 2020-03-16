import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'

const Post = (props) => (
  <Layout>
    <main>
      {props.flower.cover_image ? (
        <img src={props.flower.cover_image} />
      ) : (
        <img src='/placeholder.png' alt='placeholder' />
      )}
      <h1>{props.flower.common_name}</h1>
      <em>Latin Name: {props.flower.latin_name}</em>
      <p>Blooming Season: {props.flower.blooming_season}</p>
      {/* <p>
      Recommended Soil: <li>{props.flower.soil}</li>
    </p> */}
      <p>Good to know: {props.flower.notes}</p>
      <style jsx>{`
        main {
          padding: 20px;
        }

        h1 {
          font-family: 'Shadows Into Light Two', cursive;
          margin-bottom: 0.3em;
        }

        img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        em {
          font-family: 'Open Sans Condensed', sans-serif;
        }

        p {
          font-family: 'Open Sans Condensed', sans-serif;
          margin: 0.5em 0;
        }
      `}</style>
    </main>
  </Layout>
)

Post.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(
    `https://flowers-mock-data.firebaseio.com/flowers/${id}.json`
  )
  const flower = await res.json()

  console.log(`Fetched flower: ${flower}`)

  return { flower }
}

export default Post
