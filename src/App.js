import { useEffect, useState } from 'react';
import './App.css';
import Data from './data/data.json';

// Questions:
// 1. Load data from local file (path: “https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json”)
// 2. Use the screenshot as an example, implement a generic function for reading any JSON file in that format, then display the top 12 brands based on audience_size. We always want to have 4 items in one row.
// 3. Add a hover state with a dark, semi-transparent overlay and display the ID of the hovered brand.

function App() {

  const [sortedData, setSortedData] = useState([]);
  const [hoveredName, setHoveredName] = useState('');

  useEffect(() => {
    sortByAudienceSize();
  },[]);

  const sortByAudienceSize = () => {
    const sortedArray = Data.data;
    for(let i=0; i<sortedArray.length; i++) {
      const maxAudienceSize = sortedArray[i].source_items.audience_size;
      for(let j=0; j<sortedArray.length;j++) {
        if(sortedArray[j].source_items.audience_size < maxAudienceSize) {
          const temp = sortedArray[i];
          sortedArray[i] = sortedArray[j];
          sortedArray[j] = temp;
        }
      }
    }
    setSortedData(sortedArray);
  }

  const handleMouseEnter = (id) => {
    setHoveredName(id);
  }

  const handleMouseLeave = () => {
    setHoveredName('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p className="title">Choose a Conde Nast brand's audience:</p>
          <div className="brand-container">
            {
             sortedData.map((d) => (
              <div className="brand-wrapper" onMouseEnter={() => handleMouseEnter(d.source_items.id)} onMouseLeave={handleMouseLeave}>
                <img alt="brand pictures" src={d.social_media_pages.picture} className="brand-picture"/>
                {
                  d.source_items.id === hoveredName &&
                  <div className="overlay">
                    <p className="overlay_text">{`ID: ${d.source_items.id}`}</p>
                    <p className="overlay_text">{d.source_items.name}</p>
                  </div>
                }
              </div>
             )) 
            }
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
