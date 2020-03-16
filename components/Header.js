import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <Link href='/'>
        <a>{<img src='/logo.png' />}</a>
      </Link>

      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          margin: 20px 0 40px;
          padding: 0 1em;
        }

        img {
          height: 160px;
        }
      `}</style>
    </header>
  )
}
