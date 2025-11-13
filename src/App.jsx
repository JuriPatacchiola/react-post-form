import axios from "axios";
import { useState } from "react";

function App() {
  const API_URL = 'https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts';

  const [postData, setPostData] = useState({
    author: '',
    title: '',
    body: '',
    public: false,
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFeedback({ message: '', type: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: '', type: '' });

    axios.post(API_URL, postData)
      .then(response => {
        console.log("Dati inviati con successo all'API:", response.data);
        setFeedback({ message: 'Post creato con successo!', type: 'success' });
        setPostData({ author: '', title: '', body: '', public: false });
      })
      .catch(error => {
        const errorMessage = error.response
          ? `Errore API: Status ${error.response.status}`
          : `Errore di rete: ${error.message}`;
        setFeedback({ message: `Invio fallito: ${errorMessage}`, type: 'error' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Crea Nuovo Post</h1>

        {feedback.message && (
          <div className={`feedback ${feedback.type === 'success' ? 'success' : 'error'}`}>
            {feedback.type === 'success' ? '✅' : '⚠️'} {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="author"
            type="text"
            placeholder="Autore"
            value={postData.author}
            onChange={handleChange}
            required
          />
          <input
            name="title"
            type="text"
            placeholder="Titolo"
            value={postData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="body"
            rows="5"
            placeholder="Testo"
            value={postData.body}
            onChange={handleChange}
            required
          />
          <label>
            <input
              name="public"
              type="checkbox"
              checked={postData.public}
              onChange={handleChange}
            /> Pubblica Subito
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Invio in corso...' : 'Invia Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
