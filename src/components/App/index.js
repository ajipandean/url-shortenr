import React, {useState} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import style from './style.module.css';

function App() {
  const [result, setResult] = useState({});
  const [url, setUrl] = useState('');
  const [base] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrl = e => setUrl(e.target.value);
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios({
        method: 'POST',
        url: `http://localhost:8000/shorten`,
        data: {
          url,
          base,
        },
      })
      setResult(data)
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={style.app}>
      <Card className={`${style.card} border-0 shadow mx-3`}>
        <Card.Header className="border-0 bg-white font-weight-bold text-center">
          URL SHORTENR
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Long URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                className="rounded-pill"
                placeholder="eg. https://longurldifficulttoremember.com"
                value={url}
                onChange={handleUrl}
              />
            </Form.Group>
            <Form.Group className="mb-0">
              <Button
                block
                type="submit"
                className="rounded-pill"
                disabled={loading || url === ''}
              >
                {loading ? 'Loading...' : 'Shorten'}
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
        {
          result.base ?
          <Card.Footer className="bg-white border-0 text-center">
            Shortened link:&nbsp;
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`localhost:8000/${result.base}`}
            >
              localhost:8000/{result.base}
            </a>
          </Card.Footer> : null
        }
      </Card>
    </div>
  );
}

export default App;
