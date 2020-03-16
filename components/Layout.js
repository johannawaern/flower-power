import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const mainStyle = {
  maxWidth: 800,
  margin: '0 auto'
}

export default function Layout(props) {
  return (
    <div style={mainStyle}>
      <Head>
        <title>Flower Power</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Shadows+Into+Light+Two&display=swap'
          rel='stylesheet'
        />
      </Head>
      <style jsx global>
        {`
          body {
            margin: 0;
          }

          main {
            padding: 20px;
          }

          h1,
          h2 {
            font-family: 'Shadows Into Light Two', cursive;
          }

          p,
          em {
            font-family: 'Open Sans Condensed', sans-serif;
          }
        `}
      </style>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
