import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <main>
      <h1>Welcome to HelloFlower</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <h2>Dig in to the Flower Top 15 of this month</h2>
      <ul>
        {props.flowers.map((flower, id) => (
          <li key={id}>
            <Link href='/p/[id]' as={`/p/${id}`}>
              <div className='flowerWrapper'>
                <a className='flower'>
                  {flower.cover_image ? (
                    <img src={flower.cover_image} />
                  ) : (
                    <img src='/placeholder.png' alt='placeholder' />
                  )}
                  <p className='flowerName'>{flower.common_name}</p>
                </a>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        h2 {
          text-align: center;
        }

        .flowerWrapper {
          margin: 1em;
        }

        .flower {
          position: relative;
        }

        .flower img {
          height: 100px;
          width: 100px;
          border-radius: 50%;
          object-fit: cover;
        }

        .flower:hover {
          transform: scale(1.2);
          transition: fill 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .flowerName {
          color: white;
          display: none;
          margin: 0;
          text-transform: uppercase;
        }

        .flower:hover .flowerName {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          height: 100px;
          width: 100px;
          border-radius: 50%;
          cursor: pointer;
        }

        ul {
          list-style: none;
          line-height: 25px;
          font-family: 'Open Sans Condensed';
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0;
          margin-top: 1em;
        }

        a {
          display: flex;
          flex-direction: column;
          margin: 10px 5px;
        }
      `}</style>
    </main>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch(
    'https://flowers-mock-data.firebaseio.com/flowers.json'
  )
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    flowers: data
  }
}

export default Index
