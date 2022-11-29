import { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect } from 'react';
const Spinner = () => (
  <div className="spinner-wrapper">
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
const Home = () => {
  const options = [
    { value: 'Apple', label: 'Apple' },
    { value: 'Tomato', label: 'Tomato' },
    { value: 'Potato', label: 'Potato' },
    { value: 'Corn', label: 'Corn' }
  ];
  const [file, setfile] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async () => {
    console.log(file);

    const formData = new FormData();
    formData.append('image', file, file.name);
    const text = 'disease';
    formData.append('text', text);
    console.log(formData);
    setIsLoading(true);
    // const res = await axios({
    //   method: 'post',
    //   url: `http://localhost:8000/${selectedOption.value.toLowerCase()}`,
    //   data: formData
    // });
    const res = {
      data: {
        class: 'Potato__Black_rot',
        confidence: 95.0,
        plant_info:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, quidem earum exercitationem velit fuga praesentium '
        // supplement: {
        //   name: 'marundhu',
        //   image_url:
        //     'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRfq9MLrPL9tFkuFbGb98fMGDdl67v4I2iDLYCVprdsdGaXURCl9UNEr8v_65X1hKrYF5NjSvB01HOGexg-3CJxjkVSu9zPNJ2AunP09vPa0gjEILskTILx&usqp=CAE',
        //   buy_link:
        //     'https://agribegri.com/products/buy-propiconazole--25-ec-systematic-fungicide-online-.php'
        // },
        // disease_brief:
        //   ' Apple scab is the most common disease of apple and crabapple trees in Minnesota. Scab is caused by a fungus that infects both leaves and fruit. Scabby fruit are often unfit for eating. Infected leaves have olive green to brown spots.   Leaves with many leaf spots turn yellow and fall off early. Leaf loss weakens the tree when it occurs many years in a row. Planting disease resistant varieties is the best way to manage scab.'
      }
    };
    setResult(res.data);
    setTimeout(() => setIsLoading(false), 3000);
  };
  return (
    <div className="container">
      <div className="nav-bar">
        <h2>Plant disease identification using U2NET and CNN</h2>
      </div>

      <div className="main-section">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
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
              <div className="select-dropdown">
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
              <button className="styled-button" onClick={uploadImage}>
                Upload
              </button>
            </div>
            {result && (
              <>
                <div className="prediction-section">
                  {console.log(result)}

                  <div className="result-card">
                    <div className="progressBar">
                      <CircularProgressbar
                        value={result.confidence}
                        text={`${result.confidence}%`}
                      />
                    </div>
                    <h3>{result.class}</h3>
                  </div>
                  {result.plant_info && (
                    <div className="description-section">
                      <h3>Plant Info</h3>
                      <p>{result.plant_info}</p>
                    </div>
                  )}
                  {result.disease_brief && (
                    <div className="description-section">
                      <h3>Brief description</h3>
                      <p>{result.disease_brief}</p>
                    </div>
                  )}
                </div>
                {result.supplement && (
                  <div className="recommandation-section">
                    <h2>Pesticide</h2>
                    <img src={`${result.supplement.image_url}`} alt="" />
                    <h3>Magic FungiX For Fungal disease</h3>
                    <button class="styled-button">
                      <a href={`${result.supplement.buy_link}`}>Buy</a>
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
