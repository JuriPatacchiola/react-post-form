import axios from "axios";
import { useState } from "react";


function App() {
  const API_URL = 'https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts';

  const app = () => {
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
    };

    axios.post(API_URL, postData)
      .then(response => {
        console.log("Dati inviati con successo all'API:", response.data);

        setFeedback({
          message: 'Post creato con successo! Controlla la console per i dati di risposta.',
          type: 'success'
        });

        setPostData({ author: '', title: '', body: '', public: false });
      })

  }
  return (
    <>



    </>
  )
}

export default App
