export default function Footer() {
  return (
    <footer>
      <p>HelloFlower | hello@flower.com</p>
      <style jsx>{`
        footer {
          background-color: #999966;
          text-align: center;
          padding: 1em;
          margin-top: 2em;
        }

        p {
          font-family: 'Open Sans Condensed', sans-serif;
          color: white;
        }
      `}</style>
    </footer>
  )
}
