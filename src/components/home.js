import { useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Home = () => {
  const [file, setfile] = useState(null);
  const [result, setResult] = useState(null);
  const uploadImage = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append('image', file, file.name);
    // const res = await axios({
    //   method: 'post',
    //   url: 'http://localhost:8000/',
    //   data: formData
    // });
    const res = { data: { confidence: 65, class: 'blackspotdisease' } };
    setResult(res.data);
  };
  return (
    <div className="container">
      <div className="nav-bar">
        <h2>Plant disease prediction</h2>
        <img src="./logo192.png" alt="" />
      </div>
      <div className="main-section">
        <div className="selection-area">
          {!file && (
            <div className="img-placeholder">
              <h2>Add image</h2>
            </div>
          )}
          {file && <img src={URL.createObjectURL(file)} />}
          <input
            type="file"
            class="custom-file-input"
            accept="image/gif, image/jpeg, image/jpg , image/png"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <button onClick={uploadImage}>Upload</button>
        </div>
        <div className="prediction-section">
          {console.log(result)}
          {result && (
            <div className="result-card">
              <div className="progressBar">
                <CircularProgressbar
                  value={result.confidence}
                  text={`${result.confidence}%`}
                />
              </div>
              <h3>{result.class}</h3>
            </div>
          )}
          ;
        </div>
      </div>
    </div>
  );
};

export default Home;
